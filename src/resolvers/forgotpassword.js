import mysql from '../connectors/mysql';
import SendMail from '../utils/sendemail';
import getAlphanumeric from '../utils/getalphanumeric';
import { addMinutesInCurrentTime } from '../utils/dateformats';
import { FORGOT_PASSWORD_LINK_EXPIRY_TIME } from '../config/constants';

export const ForgotPasswordMails = async (_, { input, }, context) => {
  const { email } = input;
  // email valid string
  if(!email) {
    return { emailsent: false, userexist: false };
  }

  // user exist with that email?
  const query = `
    SELECT email from authors 
    WHERE email=?
  `;

  const result = await mysql.query(query, [email]);
  if (!result || !result.length) {
    return {
      emailsent: false,
      userexist: false
    }
  }

  // generate a link for reset password
  const randomuniquekey = getAlphanumeric();
  // store the key in tracker for request validating
  const keyquery = `
    INSERT INTO tracker (key, expiry)
    VALUES (?, ?)
  `;

  const storeresult = mysql.query(keyquery, [randomuniquekey, addMinutesInCurrentTime(FORGOT_PASSWORD_LINK_EXPIRY_TIME)]);

  let resetpasswordlink = ``;
  if (storeresult && storeresult.insertId) { 
    resetpasswordlink = `${process.env.APP_URL}?reset-password=${randomuniquekey}`;
  }
  
  // at this point user exist and valid
  const toemail = `${email}`;
  const mailsubject = `Reset your password`;
  const htmltemplate = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body>
      </body>
    </html>
  `;

  const response = await SendMail({ toemail, mailsubject, htmltemplate });
  if (response) { 
    return { emailsent: true };
  }
}