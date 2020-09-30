var nodemailer = require("nodemailer");
var ses = require('nodemailer-ses-transport');

/*for setting up Amazon SES service for email sending for various need*/
var sesTransport = nodemailer.createTransport(ses({
    accessKeyId: 'FromAmazon',
    secretAccessKey: 'FromAmazon',
    region: 'us-west-2'
}));

// http://budiirawan.com/send-emails-using-amazon-ses-and-node-js/
var supportMail = 'support@yourdomain.in',
    noreplyMail = 'no-reply@yourdomain.in',
    ideasMail = 'ideas@yourdomain.in';

export default async ({ toemail, mailsubject, htmltemplate}) => {
    var mailOptions={
        from: noreplyMail,
        to : toemail,
        subject : mailsubject,
        html: htmltemplate
    };

    return await sesTransport.sendMail(mailOptions);
}

