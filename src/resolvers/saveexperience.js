
import mysql from '../connectors/mysql';

const saveExperience = async (_, { input }, context) => { 
  const { authorid, title, experience } = input;

  const query = `
    INSERT INTO experiences (authorid, title, experience)
    VALUES (?, ?, ?);
  `;

  let response = {};

  await mysql.query(query, [authorid, title, experience], (err, response) => {
    if (err) {
      logger.error(`[ERROR] saveExperience`, err);
    }
    else if(response.affectedRows > 0) { 
      //response = { status: 'success' };
      response = input;
    }
    else {
      //response = { status: 'failed' };
      response = input;
    }
  });

  console.log('response', response);
  
  return response;
}

export { saveExperience };