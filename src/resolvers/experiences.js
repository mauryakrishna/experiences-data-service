import mysql from '../connectors/mysql';
import { cursorFormat, publishDateFormat } from '../utils/dateformats';
import { EXPERIENCES_PER_PAGE } from '../config/constants';
import { getSlug, getSlugKey } from '../utils/experiences';
import serialize from "../utils/getexperienceintrotext";

const createARowWithSlugKey = async (authoruid) => { 

  if (!authoruid) { 
    throw Error('Authoruid is required');
  }
  
  const slugkey = getSlugKey();
  
  const query = `
    INSERT INTO experiences (slugkey, authoruid)
    VALUES (?,?)
  `;
  try {
    await mysql.query(query, [slugkey, authoruid]);
    return slugkey;
  }
  catch (error) { 
    throw Error('Error inserting a record.', error);
  }
  
};

export const saveExperience = async (_, { input }, context) => {
  const { experience, title } = input;
  const { authoruid } = context;

  const slug = title ? getSlug(title) : null;
  
  let slugkey = input.slugkey;
  // no slugkey means new record
  if (!slugkey) { 
    slugkey = await createARowWithSlugKey(authoruid);
  }

  const query = `
    UPDATE experiences
    SET experience = ?, title = ?, slug = ?
    WHERE slugkey = ? and authoruid = ?
  `;

  const result = await mysql.query(query, [JSON.stringify(experience), title, slug, slugkey, authoruid]);

  return { saved: !!(result && result.affectedRows), slugkey };
};

// for first 10 experience, load the list for home page
export const getExperiences = async (_, { cursor, experienceperpage }, context) => {
  cursor = cursor || cursorFormat(new Date());
  experienceperpage = experienceperpage || EXPERIENCES_PER_PAGE;

  const query = `
    SELECT e.slugkey, e.slug, e.title, e.publishdate, e.authoruid,
    e.experience, e.readcount, e.ispublished, e.created_at, 
    a.displayname
    FROM experiences e
    LEFT JOIN authors a ON (a.uid = e.authoruid)
    WHERE ispublished = ${true} AND publishdate < ?
    ORDER BY publishdate DESC
    LIMIT ?
  `;

  let result = await mysql.query(query, [cursor, experienceperpage]);

  const len = result.length;
  if (len > 0) { 
    cursor = cursorFormat(new Date(result[len - 1].publishdate));
  }

  result = result.map((exp) => { 
    exp.experienceintrotext = serialize(exp.experience)
    exp.publishdate = publishDateFormat(exp.publishdate);
    exp.author = {
      displayname: exp.displayname,
      uid: exp.authoruid
    };
    delete exp.displayname;
    delete exp.authoruid;
    return exp;
  });
  
  return { cursor, experiences: result || [] };
};

// single read
export const getAnExperienceForRead = async (_, { slugkey }, context) => { 
  const query = `
    SELECT * FROM experiences
    WHERE slugkey = ? ${context.authoruid? '' : 'AND ispublished = true'}
  `;
  const result = await mysql.query(query, [slugkey]);

  let experience = result[0];
  if (!experience) { 
    console.log(`Could not find experience for ${slugkey}`);
    return {
      __typename: 'ExperienceNotFound',
      experiencefound: false
    };
  }

  // experience found
  const { publishdate } = experience;
  if (publishdate) { 
    experience.publishdate = publishDateFormat(publishdate);
  }
  
  const authorQuery = `
      SELECT uid, displayname, shortintro FROM authors
      WHERE uid = ?
    `;
  const author = await mysql.query(authorQuery, [experience.authoruid]);
  
  if (!(author && author.length > 0)) { 
    console.log(`Could not find author for ${experience.authoruid} with experience slugkey ${slugkey}.`);
    return {};
  }

  experience.author = author[0];

  return {
    __typename: 'Experience',
    ...experience
  };
};

// single edit
export const getAnExperienceForEdit = async (_, { slugkey }, context) => {
  const query = `
    SELECT title, experience, ispublished 
    FROM experiences
    WHERE slugkey = ?
  `;
  try {
    const result = await mysql.query(query, [slugkey]);
    
    if (result && result.length > 0) {
      const { title, experience, ispublished } = result[0];
      return { title, experience, ispublished };
    }
    else {
      console.log(`Could not get exp for edit ${slugkey}.`);
      return {};
    }
  }
  catch (err) { 
    throw Error(err);
  }
};

export const publishExperience = async (_, { input }, context) => {
  const { slugkey, enablethoughts } = input;
  const { authoruid } = context;

  const query = `
    UPDATE experiences 
    SET thoughtsenabled = ?, publishdate = (SELECT NOW(6)), ispublished=${true}
    WHERE slugkey = ? AND authoruid = ?
  `;

  const result = await mysql.query(query, [enablethoughts, slugkey, authoruid]);

  if (!(result && result.affectedRows > 0)) { 
    console.log(`Could not publish experience for slugkey ${slugkey} and author ${authoruid}.`);
    return { published: false };
  }

  const query1 = `
    SELECT slug, ispublished
    FROM experiences
    WHERE slugkey = ?
  `;

  const result1 = await mysql.query(query1, [slugkey]);

  if (!(result1 && result1.length > 0)) { 
    console.log(`Could not get the published experience for slugkey ${slugkey}.`);
    return { published: false };
  }
  const { slug, ispublished } = result1[0];

  return { published: ispublished, slug, slugkey };
}

export const saveNPublishExperience = async (_, { input }, context) => {
  const { slugkey, title, experience } = input;
  const { authoruid } = context;
  
  const query = `
    UPDATE experiences
    SET title = ?, experience = ?
    WHERE slugkey = ? and authoruid = ?
  `;

  const result = await mysql.query(query, [title, JSON.stringify(experience), slugkey, authoruid]);

  if (!(result && result.affectedRows > 0)) { 
    console.log(`Could not SaveNPublish for ${slugkey}.`);
    return { published: false };
  }

  const query1 = `
    SELECT slug, slugkey, ispublished
    FROM experiences
    WHERE slugkey = ? 
  `;

  const result1 = await mysql.query(query1, [slugkey]);
  if (!(result && result1.length > 0)) { 
    console.log(`Could not get SaveNPublished experience for ${slugkey}.`);
    return { published: false };
  }  

  const { slug, ispublished } = result1[0];

  return { published: ispublished, slug, slugkey };
};

export const deleteAnExperience = async (_, { input }, context) => { 
  const { slugkey, authoruid } = input;
  // only author of the experience can perform deletion
  if (authoruid !== context.authoruid) { 
    return { deleted: false };
  }

  const query = `
    DELETE FROM experiences WHERE slugkey=? and authoruid=?
  `;

  const result = await mysql.query(query, [slugkey, authoruid]);
  return { deleted: !!result.affectedRows, slugkey };
}