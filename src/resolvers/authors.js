import mysql from '../connectors/mysql';

export const getAuthor = async (_, { authorid }, context) => { 
  
  const query = `
    SELECT * FROM authors
    WHERE id = ?
  `;

  const result = await mysql.query(query, [authorid]);

  return result[0];
};