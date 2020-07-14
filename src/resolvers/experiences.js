import mysql from '../connectors/mysql';

import { getSlug, getSlugKey } from '../utils/experiences';

const createARowWithSlugKey = async (authoruid) => { 
  
  const slugkey = getSlugKey();
  
  const query = `
    INSERT INTO experiences (slugkey, authoruid)
    VALUES (?,?)
  `;
  try {
    const result = await mysql.query(query, [slugkey, authoruid]);
    return slugkey;
  }
  catch (error) { 
    throw Error('Something went wrong.');
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

  return { saved: !!result.changedRows, title, slugkey };
}

export const saveExperience = async (_, { input }, context) => {
  const { authoruid, experience } = input;

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

  return { saved: !!result.changedRows, experience, slugkey };
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
  
  return result;
};

export const getAnExperience = async (_, { slugkey }, context) => { 

  const query = `
    SELECT * FROM experiences
    WHERE slugkey = ? AND ispublished = ?
  `;

  const result = await mysql.query(query, [slugkey, true]);

  let experience = result[0];

  const authorQuery = `
    SELECT * FROM authors
    WHERE uid = ?
  `;

  const author = await mysql.query(authorQuery, [experience.authoruid]);

  experience.author = author[0];

  return experience;
};

export const publishExperience = async (_, { input }, context) => {
  const { slugkey, authoruid } = input;

  const query = `
    UPDATE experiences 
    SET publishdate = (SELECT NOW()), ispublished=${true}
    WHERE slugkey = ? AND authoruid = ?
  `;

  await mysql.query(query, [slugkey, authoruid]);

  const query1 = `
    SELECT slug, ispublished
    FROM experiences
    WHERE slugkey = ?
  `;

  const result1 = await mysql.query(query1, [slugkey]);

  const { slug, ispublished } = result1[0];

  return { published: ispublished, slug };
}

export const saveNPublishExperience = async (_, { input }, context) => {
  const { id, title, experience, authoruid } = input;

  const query = `
    UPDATE experiences
    SET title = ?, experience = ?
    WHERE id = ? and authoruid = ?
  `;

  await mysql.query(query, [title, JSON.stringify(experience), id, authoruid]);

  const query1 = `
    SELECT slug, slugkey, ispublished
    FROM experiences
    WHERE id = ? 
  `;

  const result1 = await mysql.query(query1, [id]);
  
  const { slug, slugkey, ispublished } = result1[0];

  return { published: ispublished, slug, slugkey };
};