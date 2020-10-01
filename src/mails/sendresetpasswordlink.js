import SendMail from '../utils/sendemail';

export default async (email, resetpasswordlink) => { 
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
      ${resetpasswordlink}
      </body>
    </html>
  `;

  const response = await SendMail({ toemail, mailsubject, htmltemplate });
}