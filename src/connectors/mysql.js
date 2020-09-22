import util from 'util';
import mysql from 'mysql2';

/**
 * The below env variable check is to avoid the timewasting may happen because of DB
 * connection refuse.
 */ 
const { MYSQL_USER, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_CONNECTION_LIMIT } = process.env;

if (!MYSQL_HOST || !MYSQL_USER || !MYSQL_PASSWORD || !MYSQL_DATABASE || !MYSQL_CONNECTION_LIMIT) { 
  throw Error('DB ENV variables are not loading.');
}

const mysqlconfig = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: process.env.MYSQL_CONNECTION_LIMIT
};

const conn = mysql.createConnection(mysqlconfig);

conn.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err);
    return;
  }
  console.log(`Connection established, thead id ${conn.threadId}.`);
});

const query = util.promisify(conn.query).bind(conn);

export default { query };
