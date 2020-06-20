import slugify from 'slugify';

import mysql from '../connectors/mysql';

const getSlug = (title) => { 
  return slugify(title, {lower: true});
}

const getSlugKey = () => { 
  return Math.random().toString(36).slice(2);
}

export const saveExperience = async (_, { input }, context) => { 
  const { authorid, experience } = input;

  const query = `
    INSERT INTO experiences (authorid, experience)
    VALUES (?, ?);
  `;

  const result = await mysql.query(query, [authorid, JSON.stringify(experience)]);

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
    ORDER BY created_at DESC
    LIMIT 20
  `;

  const result = await mysql.query(query, [0]);

  return result;
};

export const getAnExperience = async (_, { input }, context) => { 
  const { slug } = input;
  
  //  extract slugkey from slug
  const slugkey = slug;
  
  const query = `
    SELECT * FROM experiences
    WHERE slugkey = ? AND ispublished = ?
  `;

  const result = await mysql.query(query, [slugKey, true]);

  return result[0];
};

export const saveTitle = async (_, { input }, context) => { 

  const { authorid, title } = input;

  const slug = getSlug(title);
  const slugKey = getSlugKey();

  const query = `
    INSERT INTO experiences (authorid, slugkey, slug, title)
    VALUES (?,?,?,?)
  `;

  const result = await mysql.query(query, [authorid, slugKey, slug, title]);

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
  if (slugKeyResult && slugKeyResult.length == 0) {
    const slugkey = getSlugKey();
    query = `
      UPDATE experiences
      SET title = ${title}, slug = ${slug}, slugkey = ${slugkey}
      WHERE id = ${id}
    `;
  }

  const result = await mysql.query(query);

  return { updated: !!result.changedRows };
}