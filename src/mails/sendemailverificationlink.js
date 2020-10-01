import SendMail from '../utils/sendemail';

export default async (email, verificationkey) => { 
  const toemail = email;
  const mailsubject = `Verify your account`;
  const htmltemplate = ``;

  return await SendMail({toemail, mailsubject, htmltemplate});
}