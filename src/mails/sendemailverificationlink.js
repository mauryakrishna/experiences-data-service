import { encrypt } from '../utils/getencrypteddata';
import sendMail from './sendemail';

export default async (displayname, email, verificationkey) => { 
  const subject = `Verify your account`;
  const templatepath = `../templates/emailverification.html`;

  const encryptedData = encrypt(JSON.stringify({ email, verificationkey }));
  const verificationURL = `${process.env.APP_URL}/verify/${encodeURIComponent(encryptedData)}`;

  const maildata = {
    displayname,
    url: verificationURL,
    writetousemail: process.env.WRITE_TO_US_EMAIL
  };

  sendMail({to: email, subject, templatepath, maildata});
}