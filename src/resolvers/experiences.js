
import mysql from '../connectors/mysql';

const saveExperience = async (_, { input }, context) => { 
  const { authorid, experience } = input;

  const query = `
    INSERT INTO experiences (authorid, experience)
    VALUES (?, ?);
  `;

  const result = await mysql.query(query, [authorid, experience]);

  return {id: result.insertId};
}

const updateExperience = async (_, { input }, context) => {
  const { id, experience } = input;

  const query = `
    UPDATE experiences (exprience)
    SET experience = ?
    WHERE id = ?
  `;

  const result = await mysql.query(query, [experience, id]);

  return { updated: !!result.changedRows };
};

const getExperience = async (_, { input }, context) => {
  const { slug } = input;

  const query = `
    SELECT * FROM experiences
    WHERE slug = ? 
  `;

  const result = mysql.query(query, [slug]);

  return result[0];
};

export { saveExperience, updateExperience, getExperience };