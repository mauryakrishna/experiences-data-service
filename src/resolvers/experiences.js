
import mysql from '../connectors/mysql';

export const saveExperience = async (_, { input }, context) => { 
  const { authorid, experience } = input;

  const query = `
    INSERT INTO experiences (authorid, experience)
    VALUES (?, ?);
  `;

  const result = await mysql.query(query, [authorid, experience]);

  return {id: result.insertId};
}

export const updateExperience = async (_, { input }, context) => {
  const { id, experience } = input;

  const query = `
    UPDATE experiences (exprience)
    SET experience = ?
    WHERE id = ?
  `;

  const result = await mysql.query(query, [experience, id]);

  return { updated: !!result.changedRows };
};

export const getExperience = async (_, { input }, context) => {
  const { slug } = input;

  const query = `
    SELECT * FROM experiences
    WHERE slug = ? 
  `;

  const result = await mysql.query(query, [slug]);

  return result[0];
};

export const saveTitle = async (_, { input }, context) => { 
  console.log('savetitle', input);
  const { authorid, title } = input;

  const query = `
    INSERT INTO experiences (authorid, title)
    VALUES (?,?)
  `;

  const result = await mysql.query(query, [authorid, title]);

  return {id: result.insertId};
}

export const updateTitle = async (_, { input }, context) => { 
  const { id, title } = input;

  const query = `
    UPDATE experiences (title)
    SET title = ?
    WHERE id = ?
  `;

  const result = await mysql.query(query, [title, id]);
}