import mysql from '../connectors/mysql';

// first 10 and infinit scroll
// get Authors details along both published experiences and unpublished experiences
export const getAuthor = async (_, { authorid }, context) => { 
  
  const experiencesQuery = `
    SELECT title, ispublished FROM experiences
    WHERE authorid = ? 
  `;

  const experiencesResult = await mysql.query(experiencesQuery, [authorid]);
  
  const query = `SELECT * FROM authors WHERE id = ?`;

  const result = await mysql.query(query, [authorid]);

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
export const UpdateAuthor = async (_, { displayname, email, shortintro, authorid }, context) => {
  const query = `
    UPDATE authors SET displayname = ?, email = ?, shortintro = ?
    WHERE id = ?
  `;

  const result = await mysql.query(query, [displayname, email, shortintro, authorid]);

  return { updated: !!result[0].changedRows };
}