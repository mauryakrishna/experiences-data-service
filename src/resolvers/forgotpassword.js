import mysql from '../connectors/mysql';
import getAlphanumeric from '../utils/getalphanumeric';
import SendResetPasswordLink from '../mails/sendresetpasswordlink';
import { addMinutesInCurrentTime } from '../utils/dateformats';
import { FORGOT_PASSWORD_LINK_EXPIRY_TIME } from '../config/constants';

export default async (_, { input }, context) => {
  const { email } = input;
  // email valid string
  if(!email) {
    return { emailsent: false, userexist: false };
  }

  // user exist with that email?
  const query = `
    SELECT email, isemailverified FROM authors 
    WHERE email=? 
  `;

  const result = await mysql.query(query, [email]);
  if (!result || !result.length) {
    return {
      emailsent: false,
      userexist: false
    }
  }

  // where to send it if the email is not verified, so check if verified
  const { isemailverified } = result[0];
  if (!isemailverified) { 
    return {
      emailsent: false,
      isemailverified: false
    }
  }

  // generate a link for reset password
  const randomuniquekey = getAlphanumeric();
  // store the key in tracker for request validating
  const keyquery = `
    INSERT INTO tracker (email, requestkey, expiry)
    VALUES (?, ?, ?)
  `;

  const expirytime = addMinutesInCurrentTime(FORGOT_PASSWORD_LINK_EXPIRY_TIME);

  const storeresult = await mysql.query(keyquery, [email, randomuniquekey, expirytime]);

  let resetpasswordlink = ``;
  if (storeresult && storeresult.insertId) { 
    resetpasswordlink = `${process.env.APP_URL}/reset-password/${randomuniquekey}`;
  }
  
  // at this point user exist and valid
  const response = await SendResetPasswordLink(email, resetpasswordlink);
  if (response) { 
    return { emailsent: true, userexist: true };
  }
}