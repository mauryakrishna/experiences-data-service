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
    ORDER BY expiry DESC
  `;

  const found = await mysql.query(query, [resetrequestkey]);
  
  // request ky not found
  if (!found || !found.length) { 
    return {
      passwordupdated: false,
      requestexpired: true
    };
  }

  // 0 to pick the latest request as there can be multiple
  const { email, expiry } = found[0];

  //if request not expired
  if (!isBefore(new Date(), new Date(expiry))) { 
    return {
      passwordupdated: false,
      requestexpired: true
    };
  }
  
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