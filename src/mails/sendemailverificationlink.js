import { encrypt } from '../utils/getencrypteddata';
import SendMail from '../utils/sendemail';

export default async (email, verificationkey) => { 
  const toemail = email;
  const mailsubject = `Verify your account`;
  const htmltemplate = ``;

  const verificationURL = `${process.env.APP_URL}/verify/${encrypt({ toemail, verificationkey })}`;
  
  console.log('verificationURL', verificationURL);
  //return await SendMail({toemail, mailsubject, htmltemplate});
}