import mysql from '../connectors/mysql';
import { THOUGHTS_PER_REQUEST } from "../config/constants";
import { cursorFormat, createdAtFormat, publishDateFormat } from '../utils/dateformats';

export const saveNewThought = async (_, {input}, context) => {
  if(context.authoruid !== input.thoughtauthoruid) {
    return { saved: false }
  }

  const query = `
    INSERT INTO thoughts (experienceslugkey, thought, thoughtauthoruid)
  `;
  const {experienceslugkey, thought, thoughtauthoruid} = input;
  const result = await mysql.query(query, [experienceslugkey, thought, thoughtauthoruid])
  
  return { saved: !!(result && result.insertId) }
}

export const getThoughtsOfExperience = async (_, { cursor, experienceslugkey }, context) => {
  cursor = cursor || cursorFormat(new Date());
  const query = `
    SELECT t.experienceslugkey, t.thought, t.thoughtauthoruid, t.created_at, a.displayname
    FROM thoughts t
    LEFT JOIN authors a ON (a.uid = t.thoughtauthoruid)
    WHERE experienceslugkey = ? AND created_at < ?
    ORDER BY created_at DESC
    LIMIT=?
  `;

  const result = await mysql.query(query, [experienceslugkey, cursor, THOUGHTS_PER_REQUEST])

  const len = result.length;
  if (len > 0) { 
    cursor = cursorFormat(new Date(result[len - 1].created_at));
  }

  result = result.map((thought) => { 
    thought.created_at = publishDateFormat(thought.created_at);
    thought.thoughtauthor = {
      displayname: thought.displayname,
      uid: thought.thoughtauthoruid
    };
    delete thought.displayname;
    delete thought.authoruid;
    return thought;
  });
  
  return { cursor, experiences: result || [] };
}

export const deleteAThought = async (_, { input }, context) => {
  const query = `
    DELETE FROM thoughts WHERE experienceslugkey=? and thoughtauthoruid=?
  `;

  const {experienceslugkey, thoughtauthoruid} = input;
  const result = await mysql.query(query, [experienceslugkey, thoughtauthoruid])
  return {deleted: !!result.affectedRows}
}