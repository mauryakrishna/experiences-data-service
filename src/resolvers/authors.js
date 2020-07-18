import moment from 'moment';
import mysql from '../connectors/mysql';
import { EXPERIENCES_PER_PAGE, EXPERIENCE_PUBLISHDATE_FORMAT } from '../config/constants';

// first 10 and infinit scroll
// get Authors details along both published experiences and unpublished experiences
// itsme: true - when author himself visit the page 
// need to know if its authors own or is visitng different author page, difference would be not showing experiences in draft 
export const getAuthor = async (_, { cursor, experienceperpage, uid, itsme }, context) => { 
  
  cursor = cursor || moment().format(EXPERIENCE_PUBLISHDATE_FORMAT);
  experienceperpage = experienceperpage || EXPERIENCES_PER_PAGE;
  itsme = itsme || true;

  console.log('in:cursor', cursor);

  const experiencesQuery = `
    SELECT title, slug, slugkey, ispublished, updated_at
    FROM experiences
    WHERE authoruid = ? AND updated_at < ?
    ${(itsme ? '': 'AND ispublished=true')} 
    ORDER BY updated_at DESC
    LIMIT ?
  `;

  const experiencesResult = await mysql.query(experiencesQuery, [uid, cursor, experienceperpage]);
  
  const len = experiencesResult.length;
  
  if (len > 0) { 
    cursor = moment(experiencesResult[len - 1].updated_at).format(EXPERIENCE_PUBLISHDATE_FORMAT);
  }

  console.log('out:cursor', cursor);
  const query = `SELECT * FROM authors WHERE uid = ?`;

  const result = await mysql.query(query, [uid]);

  const author = result[0];
  author.experiences = experiencesResult;

  return { cursor, author };
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