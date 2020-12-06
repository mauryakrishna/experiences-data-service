import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_EXPIRY } from '../config/constants';

const getAccessToken = (tokendata) => { 
  if (!tokendata) { 
    throw Error('Token data missing.');
  }

  const expiresIn = ACCESS_TOKEN_EXPIRY;

  try {
    return jwt.sign(tokendata, process.env.JWT_SECRET, { expiresIn });
  }
  catch (err) { 
    console.log('Erro generating token', err);
  }
};

export default getAccessToken;