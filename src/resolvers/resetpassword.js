import isBefore from 'date-fns/is_before'
import mysql from '../connectors/mysql';
import gethash from '../utils/gethash';

export default async (_, { input }, context) => { 
  const { newpassword, resetrequestkey } = input;
  if (!newpassword || !resetrequestkey) { 
    return {
      passwordupdated: false,
      validrequest: false
    };
  }

  // Is resetrequestkey valid and not expired
  const query = `
    SELECT email, expiry 
    FROM tracker
    WHERE key=? 
  `;

  const found = mysql.query(query, [resetrequestkey]);
  // request ky not found
  if (!found || !found.length) { 
    return {
      passwordupdated: false,
      validrequest: false
    };
  }

  const { email, expiry } = found[0];

  //if request not expired
  if (!isBefore(new Date(), new Date(expiry))) { 
    return {
      passwordupdated: false,
      validrequest: true
    };
  }

  // update password
  const updatequery = `
    UPDATE authors
    SET password=?
    WHERE email=?
  `;
  const newPasswordHash = gethash(newpassword);
  const updated = mysql.query(updatequery, [newPasswordHash, email]);

  if (updated && updated.affectedRows) {
    return {
      passwordupdated: true,
      validrequest: true
    }
  }
  else { 
    return {
      passwordupdated: false,
      validrequest: false
    };
  }
}