import jwt from 'jsonwebtoken';

export default (tokendata) => { 
  if (!tokendata) { 
    throw Error('Token data missing.');
  }

  const expiresIn = 60 * 60 * 24 * 7; // 7 days
  try {
    return jwt.sign(tokendata, process.env.JWT_SECRET, { expiresIn });
  }
  catch (err) { 
    console.log('Erro generating token', err);
  }
};