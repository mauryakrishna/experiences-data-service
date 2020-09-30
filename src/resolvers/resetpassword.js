import { isBefore } from 'date-fns';
import mysql from '../connectors/mysql';
import gethash from '../utils/gethash';

export default async (_, { input }, context) => { 
  const { newpassword, resetrequestkey } = input;
  
  if (!newpassword || !resetrequestkey) { 
    return {
      passwordupdated: false,
    };
  }
  
  // Is resetrequestkey valid and not expired
  const query = `
    SELECT email, expiry 
    FROM tracker
    WHERE requestkey=? 
  `;

  const found = await mysql.query(query, [resetrequestkey]);
  
  // request ky not found
  if (!found || !found.length) { 
    return {
      passwordupdated: false,
      requestexpired: true
    };
  }

  const { email, expiry } = found[0];

  console.log('before before');
  //if request not expired
  if (!isBefore(new Date(), new Date(expiry))) { 
    return {
      passwordupdated: false,
      requestexpired: true
    };
  }
  console.log('shd not print');
  // update password
  const updatequery = `
    UPDATE authors
    SET password=?
    WHERE email=?
  `;
  const newPasswordHash = gethash(newpassword);
  const updated = await mysql.query(updatequery, [newPasswordHash, email]);

  if (updated && updated.affectedRows) {
    return {
      passwordupdated: true,
    }
  }
  else { 
    return {
      passwordupdated: false,
    };
  }
}