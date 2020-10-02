import { isBefore } from 'date-fns';
import mysql from '../connectors/mysql';
import { VERIFICATION_LINK_EXPIRY_TIME } from '../config/constants';

export default async (_, { input }, context) => { 
  const { email, verificationkey } = input;
  if (!email || !verificationkey) { 
    return {
      requestvalid: false
    };
  }

  // if email not already verified
  const validemailquery = `
    SELECT isemailverified FROM authors
    WHERE email=?
  `;
  const found = await mysql.query(validemailquery, [email]);
  if (!found || !found.length) { 
    return {
      requestvalid: false
    }
  }
  const { isemailverified } = found[0];
  
  if (isemailverified) { 
    return {
      isemailverified: true
    }
  }

  // verificationkey should be valid for given email | for account activation this will be forever
  const verificationkeyQuery = `
    SELECT email, requestkey, expiry
    FROM tracker
    WHERE email=? AND requestkey=?
    ORDER BY expiry DESC
  `;
  const verificationrequest = await mysql.query(verificationkeyQuery, [email, verificationkey]);
  if (!verificationrequest || !verificationrequest.length) { 
    return {
      requestvalid: false
    }
  }
  
  // 0 to pick the latest request as there can be multiple
  const { expiry } = verificationrequest[0];
  if (!isBefore(new Date(), new Date(expiry))) { 
    return {
      requestvalid: false,
    }
  }

  // update author
  const setverificationQuery = `
    UPDATE authors SET isemailverified=${true}
    WHERE email=?
  `;

  const update = await mysql.query(setverificationQuery, [email]);
  
  if (!update || !update.affectedRows) {
    return {
      requestvalid: false,
      isemailverified: false
    }
  }
  else { 
    return {
      requestvalid: true,
      verifysuccess: true
    }
  }
}