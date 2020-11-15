import mysql from 'mysql2';

/**
 * The below env variable check is to avoid the timewasting may happen because of DB
 * connection refuse.
 */
const { MYSQL_USER, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_CONNECTION_LIMIT } = process.env;

if (!MYSQL_HOST || !MYSQL_USER || !MYSQL_PASSWORD || !MYSQL_DATABASE || !MYSQL_CONNECTION_LIMIT) {
  console.log(`User:${MYSQL_USER}, Host:${MYSQL_HOST}, Pwd:${MYSQL_PASSWORD}, Database:${MYSQL_DATABASE}, ConnectionLimit${MYSQL_CONNECTION_LIMIT}`);
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

const pool = mysql.createPool(mysqlconfig);

/*
  Below code is just to ensure that mysql connection is happening correctly
*/
pool.getConnection(function (err, connection) {
  if (err) {
    console.error(`Error connecting with user ${MYSQL_USER} and error ${err}`);
  } else {
    console.log(`Connection established, thead id ${connection.threadId}.`);
    connection.release();
  }
});

const pomisePool = pool.promise();

export default { query: pomisePool.query };
