import mysql from '../connectors/mysql';

import { getSlug, getSlugKey } from '../utils/experiences';

const createARowWithSlugKey = async (authoruid) => { 
  
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
    throw Error('Error inserting a record.');
  }
  
};

export const saveTitle = async (_, { input }, context) => { 
  const { title, authoruid } = input;

  const slug = getSlug(title);
  
  let slugkey = input.slugkey;
  // no slugkey means new record
  if (!slugkey) { 
    slugkey = await createARowWithSlugKey(authoruid);
  }

  let query = `
      UPDATE experiences
      SET title = ?, slug = ?
      WHERE slugkey =? and authoruid = ?
    `;

  const result = await mysql.query(query, [title, slug, slugkey, authoruid]);
  
  return { saved: !!(result && result.affectedRows), title, slugkey };
}

export const saveExperience = async (_, { input }, context) => {
  const { authoruid, experience } = input;
  console.log('->', input);
  let slugkey = input.slugkey;
  // no slugkey means new record
  if (!slugkey) { 
    slugkey = await createARowWithSlugKey(authoruid);
  }

  const query = `
    UPDATE experiences
    SET experience = ?
    WHERE slugkey = ? and authoruid = ?
  `;

  const result = await mysql.query(query, [JSON.stringify(experience), slugkey, authoruid]);

  return { saved: !!(result && result.affectedRows), experience, slugkey };
};

// for first 20 experience loading and infinite scroll
export const getExperiences = async (_, __, context) => {
  const query = `
    SELECT * FROM experiences
    WHERE ispublished = ${true}
    ORDER BY publishdate DESC
    LIMIT 20
  `;

  const result = await mysql.query(query);
  
  return result || [];
};

export const getAnExperienceForRead = async (_, { slugkey }, context) => { 
  const query = `
    SELECT * FROM experiences
    WHERE slugkey = ? AND ispublished = ?
  `;
  const result = await mysql.query(query, [slugkey, true]);

  let experience = result[0];
  if (!experience) { 
    console.log(`Could not find experience for ${slugkey}`);
    return {};
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

  return experience;
};

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
  const { slugkey, authoruid } = input;

  const query = `
    UPDATE experiences 
    SET publishdate = (SELECT NOW()), ispublished=${true}
    WHERE slugkey = ? AND authoruid = ?
  `;

  const result = await mysql.query(query, [slugkey, authoruid]);

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
  const { slugkey, title, experience, authoruid } = input;

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