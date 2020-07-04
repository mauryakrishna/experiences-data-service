import mysql from '../connectors/mysql';

// first 10 and infinit scroll
// get Authors details along both published experiences and unpublished experiences
export const getAuthor = async (_, { uid }, context) => { 
  
  const experiencesQuery = `
    SELECT title, slug, slugkey, ispublished FROM experiences
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
export const saveAuthor = async (_, { displayname, email, shortintro, authoruid }, context) => { 
  const query = `
    INSERT INTO authors (displayname, email, shortintro, authoruid)
    VALUES (?, ?, ?, ?)
  `;

  const result = await mysql.query(query, [displayname, email, shortintro, authoruid]);

  return { id: result[0].insertId };
}

// kind of update user details
export const updateAuthor = async (_, { input }, context) => {

  const { displayname, shortintro, authoruid } = input;
  const query = `
    UPDATE authors SET displayname = ?, shortintro = ?
    WHERE uid = ?
  `;

  const result = await mysql.query(query, [displayname, shortintro, authoruid]);

  return { updated: !!result.affectedRows };
}