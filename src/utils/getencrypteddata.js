import CryptoJS from 'crypto-js';

export const encrypt = (data) => { 
  if (typeof data !== 'string') { 
    return data;
  }
  
  return CryptoJS.AES.encrypt(data, process.env.CRYPTOJS_SECRET_KEY).toString();
};

export const decrypt = (data) => { 
  if (typeof data !== 'string') { 
    return data;
  }

  const bytes = CryptoJS.AES.decrypt(data, process.env.CRYPTOJS_SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};