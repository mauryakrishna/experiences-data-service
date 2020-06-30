import slugify from 'slugify';

import mysql from '../connectors/mysql';

const getSlug = (title) => { 
  return slugify(title, {lower: true});
}

const getSlugKey = () => { 
  return Math.random().toString(36).slice(2);
}

export const saveExperience = async (_, { input }, context) => { 
  const { authoruid, experience } = input;
  
  const query = `
    INSERT INTO experiences (authoruid, experience)
    VALUES (?, ?);
  `;

  const result = await mysql.query(query, [authoruid, JSON.stringify(experience)]);

  return {id: result.insertId};
}

export const updateExperience = async (_, { input }, context) => {
  const { id, experience } = input;
  
  const query = `
    UPDATE experiences
    SET experience = ?
    WHERE id = ?
  `;

  const result = await mysql.query(query, [JSON.stringify(experience), id]);

  return { updated: !!result.changedRows };
};

// for first 20 experience loading and infinite scroll
export const getExperiences = async (_, __, context) => {
  const query = `
    SELECT * FROM experiences
    WHERE ispublished = ${true}
    ORDER BY created_at DESC
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

export const saveTitle = async (_, { input }, context) => { 

  const { authoruid, title } = input;

  const slug = getSlug(title);
  const slugKey = getSlugKey();

  const query = `
    INSERT INTO experiences (authoruid, slugkey, slug, title)
    VALUES (?,?,?,?)
  `;

  const result = await mysql.query(query, [authoruid, slugKey, slug, title]);

  return {id: result.insertId};
}

export const updateTitle = async (_, { input }, context) => { 
  const { id, title } = input;

  const slug = getSlug(title);
  
  let query = `
      UPDATE experiences
      SET title = '${title}', slug = '${slug}'
      WHERE id = ${id}
    `;

  const slugKeyExistsQuery = `SELECT slugkey FROM experiences Where id = ?`;

  const slugKeyResult = await mysql.query(slugKeyExistsQuery, [id]);

  // this is when id for experience already exists and then updating title of the experience
  // slugkey did not exists
  if (slugKeyResult && slugKeyResult.length && !slugKeyResult[0].slugkey) {
    const slugkey = getSlugKey();
    query = `
      UPDATE experiences
      SET title = '${title}', slug = '${slug}', slugkey = '${slugkey}'
      WHERE id = ${id}
    `;
  }

  const result = await mysql.query(query);

  return { updated: !!result.changedRows };
}