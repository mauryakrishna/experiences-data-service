import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import SendMail from '../utils/sendemail';

export default async ({ to, subject, templatepath, maildata }) => { 
  const filepath = path.resolve(__dirname, templatepath);

  fs.readFile(filepath, { encoding: 'UTF-8' }, (err, templatedata) => { 
    if (!err) {
      const html = _.template(templatedata, maildata);
      SendMail({to, subject, html});
    }
    else { 
      console.log(`[ERROR] reading templatepath ${templatepath} | Error: ${err}`);
    }
  })
  
}