import bcrypt from 'bcrypt';
import mysql from '../connectors/mysql';
import getAuthToken from '../utils/getauthtoken';
import getAlphanumeric from '../utils/getalphanumeric';
import SendEmailVerificationLink from '../mails/sendemailverificationlink';
import { EXPERIENCES_PER_PAGE, VERIFICATION_LINK_EXPIRY_TIME } from '../config/constants';
import { cursorFormat, createdAtFormat, publishDateFormat, addMinutesInCurrentTime } from '../utils/dateformats';

export const verifyMe = (_, __, context) => {
  const { displayname, authoruid } = context;
  const valid = !!(displayname && authoruid);
  if (valid) { 
    return { valid, displayname, authoruid };
  }
  return { valid };
};

// first 10 and infinit scroll
// get Authors details along both published experiences and unpublished experiences
// itsme: true - when author himself visit the page 
// need to know if its authors own or is visitng different author page, difference would be not showing experiences in draft 
export const getAuthor = async (_, { cursor, experienceperpage, uid, itsme }, context) => { 
  cursor = cursor || cursorFormat(new Date());
  experienceperpage = experienceperpage || EXPERIENCES_PER_PAGE;
  itsme = (uid == context.authoruid);

  const experiencesQuery = `
    SELECT *
    FROM experiences
    WHERE authoruid = ? AND updated_at < ?
    ${(itsme ? '': 'AND ispublished=true')} 
    ORDER BY updated_at DESC
    LIMIT ?
  `;

  const experiencesResult = await mysql.query(experiencesQuery, [uid, cursor, experienceperpage]);
  
  const len = experiencesResult.length;
  
  if (len > 0) { 
    cursor = cursorFormat(new Date(experiencesResult[len - 1].updated_at));
  }

  const query = `SELECT * FROM authors WHERE uid = ?`;

  const result = await mysql.query(query, [uid]);

  const author = result[0];
  author.experiences = experiencesResult.map((exp) => { 
    exp.created_at = createdAtFormat(exp.created_at);
    
    if (exp.publishdate) { 
      exp.publishdate = publishDateFormat(exp.publishdate);
    }
    
    return exp;
  });
  
  return { cursor, author };
};

const getUniqueUid = async (username) => { 

  const query = `
    SELECT uid FROM authors
    WHERE uid like '${username}%'
  `;

  const result = await mysql.query(query);
  
  let uid = username;
  const usernameset = result.map((user) => { return user.uid });
  
  if (usernameset.includes(username)) {
    // if found means uid duplicate, so generate unique
    do { 
      let randomNumber = Math.floor(Math.random(3) * 1000); // 3 digit 
      uid = `${username}${randomNumber}`;
    }
    while (usernameset.includes(uid) !== false)
  }

  return uid;
}

const getExisitingAuthor = async (email) => { 
  const query = `SELECT email, isemailverified FROM authors WHERE email = ?`;

  const result = await mysql.query(query, [email]);
  
  if (result && result.length) { 
    return {exist: true, isemailverified: result[0].isemailverified}
  }
  return {exist: false};
}

/**
 * because fb Oauth is not used, below methodis not in force
 */
export const buttonPressRegister = async (_, __, context) => { 
  const { displayname, email } = context;
  const variables = { input: { displayname, email } };

  return await signupAuthor(_, variables, context);
}

const setForAccountVerification = async (email) => { 
  // after inserting a user, set for email verification
  const verificationkey = getAlphanumeric();
  const verificationQuery = `
    INSERT INTO tracker (email, requestkey, expiry)
    VALUES (?,?,?)
  `;

  const verifytracker = await mysql.query(verificationQuery, [email, verificationkey, addMinutesInCurrentTime(VERIFICATION_LINK_EXPIRY_TIME)]);
  
  // send mail for verifying email address
  // await SendEmailVerificationMail(email, verificationkey);

};

export const resendVerificationLink = async (_, { email }, context) => { 
  await setForAccountVerification(email);
  return { resendsuccess: true };
}

// kind of register user
export const signupAuthor = async (_, { input }, context) => {
  
  const { displayname, email, password, shortintro, region, languages } = input;

  // the below is just backend protection from crreatng a duplicate author
  const { exist, isemailverified } = await getExisitingAuthor(email);
  
  // if found already, this should never happen that while registering we found if the user for 
  // given email exist, it will be done before reaching this point
  if (exist) {
    return { exist, isemailverified };
  }

  // else regiser
  const username = `@${email.substring(0, email.lastIndexOf('@'))}`;
  const uid = await getUniqueUid(username);
  const query = `
    INSERT INTO authors (displayname, email, password, region, languages, uid)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const SALT_ROUNDS = 12;
  const hashpassword = bcrypt.hashSync(password, SALT_ROUNDS);
  const result = await mysql.query(query, [displayname, email, hashpassword, region, languages, uid]);
  if (result && !result.insertId) {
    throw Error('Error signing up Author.');
  }

  await setForAccountVerification(email);

  return { exist };
}

// login
export const signinAuthor = async (_, { email, password }, context) => {

  const query = `
    SELECT displayname, uid as authoruid, languages, region, shortintro, password, isemailverified
    FROM authors
    WHERE email=?
  `;
  
  const result = await mysql.query(query, [email]);
  const author = result[0];
  
  // user may not have signed up
  if (!result || !result.length) { 
    return { exist: false };
  }
  else 
  { 
    const { isemailverified } = result[0];
    // for asking to validate email
    if (!isemailverified) { 
      return { exist: true, isemailverified };
    }

    const match = await bcrypt.compare(password, result[0].password);
    if (match) {
      const tokendata = {
        email,
        ...result[0]
      };
      const token = getAuthToken(tokendata);
      return {
        exist: true, author: { ...author, authoruid: author && author.authoruid }, token
      }
    }
    else { 
      return {
        exist: true, message: "Authentication failed."
      };
    }
  }
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