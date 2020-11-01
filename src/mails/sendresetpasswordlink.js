import sendMail from './sendemail';

export default async (displayname, email, resetpasswordlink) => { 
  const subject = `Reset your password`;
  const templatepath = `../templates/resetpassword.html`;
  const maildata = {
    displayname,
    url: resetpasswordlink,
    writetousemail: process.env.WRITE_TO_US_EMAIL
  };

  sendMail({to: email, subject, templatepath, maildata});
}