import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import SendMail from '../utils/sendemail';

export default async ({ to, subject, templatepath, maildata }) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Verification link=> ${maildata.url}`);
    return;
  }

  const filepath = path.resolve(__dirname, templatepath);
  fs.readFile(filepath, { encoding: 'UTF-8' }, (err, templatedata) => {
    if (!err) {
      const compiledTempate = _.template(templatedata);
      const html = compiledTempate(maildata);
      SendMail({ to, subject, html });
    }
    else {
      console.log(`[ERROR] reading templatepath ${templatepath} | Error: ${err}`);
    }
  })

}