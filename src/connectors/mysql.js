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

const pool = mysql.createPool(mysqlconfig);

const query = (query, params, callback) => {
  if (process.env.LOG_MYSQL_LATENCY) {
    console.time('mysql_connection_latency');
  }

  pool.getConnection((err, conn) => {
    if (err != null) {
      logger(`[ERROR] Failed to get connection from mysql ${err}`);
      if (conn != null) {
        conn.release();
      }
      if (callback != null) {
        if (process.env.LOG_MYSQL_LATENCY) { 
          console.timeEnd('mysql_connection_latency')
        }
        return callback('DB error');
      }
    }
    conn.query(query, params, (_err, rows) => {
      if (process.env.LOG_MYSQL_LATENCY) {
        console.timeEnd('mysql_connection_latency');
      }
      if (_err != null) {
        logger(_err, true)
      }
      conn.release()
      if (callback != null) {
        return callback(_err, rows)
      }
    })
  });
};

const end = (callback) => {
  pool.end(callback)
};

const _mysql = { query, end }
export default _mysql;
