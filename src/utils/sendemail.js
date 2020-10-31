var nodemailer = require("nodemailer");
var ses = require('nodemailer-ses-transport');

/*for setting up Amazon SES service for email sending for various need*/
var sesTransport = nodemailer.createTransport(ses({
    accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
    secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
    region: 'us-east-2'
}));

// http://budiirawan.com/send-emails-using-amazon-ses-and-node-js/
export default async ({ to, subject, html }) => {
  var mailOptions = {
      from: process.env.AMAZON_SES_FROM_EMAIL,
      to,
      subject,
      html
  };

  return await sesTransport.sendMail(mailOptions);
}

