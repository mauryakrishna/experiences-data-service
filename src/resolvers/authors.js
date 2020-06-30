import mysql from '../connectors/mysql';

// first 10 and infinit scroll
// get Authors details along both published experiences and unpublished experiences
export const getAuthor = async (_, { uid }, context) => { 
  
  const experiencesQuery = `
    SELECT title, slugkey, ispublished FROM experiences
    WHERE authoruid = ? 
  `;

  const experiencesResult = await mysql.query(experiencesQuery, [uid]);
  
  const query = `SELECT * FROM authors WHERE uid = ?`;

  const result = await mysql.query(query, [uid]);

  const author = result[0];
  author.experiences = experiencesResult;

  return author;
};

// kind of register user
export const SaveAuthor = async (_, { displayname, email, shortintro }, context) => { 
  const query = `
    INSERT INTO authors (displayname, email, shortintro)
    VALUES (?, ?, ?)
  `;

  const result = await mysql.query(query, [displayname, email, shortintro]);

  return { id: result[0].insertId };
}

// kind of update user details
export const UpdateAuthor = async (_, { displayname, email, shortintro, authoruid }, context) => {
  const query = `
    UPDATE authors SET displayname = ?, email = ?, shortintro = ?
    WHERE id = ?
  `;

  const result = await mysql.query(query, [displayname, email, shortintro, authoruid]);

  return { updated: !!result[0].changedRows };
}