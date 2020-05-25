import util from 'util';
import mysql from 'mysql';

const mysqlconfig = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: process.env.MYSQL_CONNECTION_LIMIT
};

// Workaround just to avoid solving into error of logger not define
const logger = console.log;

const conn = mysql.createConnection(mysqlconfig);

const query = util.promisify(conn.query).bind(conn);

export default { query };
