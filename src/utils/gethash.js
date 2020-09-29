import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export default (inputstring) => { 
  if (!inputstring) { 
    throw Error('Invalid string for hashing.');
  }

  return bcrypt.hashSync(password, SALT_ROUNDS);
}