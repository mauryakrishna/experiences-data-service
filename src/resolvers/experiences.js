import slugify from 'slugify';
slugify.extend({
  '>': 'gt',
  '<': 'lt',
  '*': 'star',
  '&': 'amp',
  '^': 'carat'
});

import mysql from '../connectors/mysql';

// the below should output a slug string which pass /^[a-z0-9]+(?:-[a-z0-9]+)*$/i
const getSlug = (title) => {
  console.log('title', title);
  let slug = slugify(title, { strict: true, lower: true }); // remove: /[*+~=.()'"`#!:@]/g,

  // no consecutive double dashes
  slug = slug
     // replace dobule dash with single
    .replace(/--/g, '-')
    // - at end should not be
    .replace(/-$/g, '')

  console.log('slug', slug);
  const sluglen = slug.length;

  if (slug && sluglen > 200) {
    slug = slug.substr(0, 200);
  }
  // workaround | should never be the case with strict: true
  else if(sluglen == 0) { 
    slug = 'all-special-chars';
  }

  return slug; 
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

  return {id: result.insertId, experience};
}

export const updateExperience = async (_, { input }, context) => {
  const { id, experience } = input;
  
  const query = `
    UPDATE experiences
    SET experience = ?
    WHERE id = ?
  `;

  const result = await mysql.query(query, [JSON.stringify(experience), id]);

  return { updated: !!result.changedRows, experience };
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

export const saveTitle = async (_, { input }, context) => { 

  const { authoruid, title } = input;

  const slug = getSlug(title);
  const slugKey = getSlugKey();

  const query = `
    INSERT INTO experiences (authoruid, slugkey, slug, title)
    VALUES (?,?,?,?)
  `;

  const result = await mysql.query(query, [authoruid, slugKey, slug, title]);

  return {id: result.insertId, title};
}

export const updateTitle = async (_, { input }, context) => { 
  const { id, title } = input;

  const slug = getSlug(title);
  
  let query = `
      UPDATE experiences
      SET title = '${title}', slug = '${slug}'
      WHERE id = ${id}
    `;
  let params = [title, slug, id];

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
    params = [title, slug, slugkey, id];
  }

  const result = await mysql.query(query, params);

  return { updated: !!result.changedRows, title };
}

export const publishExperience = async (_, { input }, context) => {
  const { id, authoruid } = input;

  const query = `
    UPDATE experiences 
    SET publishdate = (SELECT NOW()), ispublished=${true}
    WHERE id = ? AND authoruid = ?
  `;

  const result = await mysql.query(query, [id, authoruid]);
  
  return { published: !!result.affectedRows };
}