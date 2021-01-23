import mysql from '../connectors/mysql';
import { THOUGHTS_PER_REQUEST } from "../config/constants";
import { cursorFormat, createdAtFormat, publishDateFormat } from '../utils/dateformats';

export const saveNewThought = async (_, { input }, context) => {
  if(context.authoruid !== input.thoughtauthoruid) {
    return { saved: false };
  }

  const query = `
    INSERT INTO thoughts (experienceslugkey, thought, thoughtauthoruid)
    VALUES (?,?,?)
  `;
  const {experienceslugkey, thought, thoughtauthoruid} = input;
  const result = await mysql.query(query, [experienceslugkey, thought, thoughtauthoruid]);
  
  const insertedid = (result && result.insertId);

  return { saved: !!insertedid, thoughtid: insertedid || null };
}

export const getThoughtsOfExperience = async (_, { cursor, experienceslugkey }, context) => {
  cursor = cursor || cursorFormat(new Date());
  const query = `
    SELECT t.id, t.experienceslugkey, t.thought, t.thoughtauthoruid, t.created_at, a.displayname
    FROM thoughts t
    LEFT JOIN authors a ON (a.uid = t.thoughtauthoruid)
    WHERE t.experienceslugkey = ? AND t.created_at < ?
    ORDER BY t.created_at DESC
    LIMIT ?
  `;

  let result = await mysql.query(query, [experienceslugkey, cursor, THOUGHTS_PER_REQUEST])

  const len = result.length;
  if (len > 0) { 
    cursor = cursorFormat(new Date(result[len - 1].created_at));
  }

  result = result.map((thought) => { 
    // for readability used thoughtid in place of id
    thought.thoughtid = thought.id;
    thought.isauthor = thought.thoughtauthoruid == context.authoruid;
    thought.created_at = publishDateFormat(thought.created_at);
    thought.thoughtauthor = {
      displayname: thought.displayname,
      uid: thought.thoughtauthoruid
    };
    delete thought.displayname;
    delete thought.authoruid;
    delete thought.id;

    return thought;
  });
  
  return { cursor, thoughts: result || [] };
}

export const deleteAThought = async (_, { input }, context) => {
  if(context.authoruid !== input.thoughtauthoruid) {
    return { deleted: false };
  }

  const query = `
    DELETE FROM thoughts WHERE experienceslugkey=? AND thoughtauthoruid=? AND id=?
  `;
  
  const {experienceslugkey, thoughtauthoruid, thoughtid} = input;
  const result = await mysql.query(query, [experienceslugkey, thoughtauthoruid, thoughtid])

  return {deleted: !!result.affectedRows, thoughtid };
}