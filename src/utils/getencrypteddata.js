import CryptoJS from 'crypto-js';

export const encrypt = (data) => { 
  if (typeof data !== 'string') { 
    throw Error('Expected an string data for encryption.');
  }
  
  return CryptoJS.AES.encrypt(data, process.env.CRYPTOJS_SECRET_KEY).toString();
};

export const decrypt = (data) => { 
  if (typeof data !== 'string') { 
    throw Error('Expected an string data for decryption.');
  }

  const bytes = CryptoJS.AES.decrypt(data, process.env.CRYPTOJS_SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};