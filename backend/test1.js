const mysql = require('mysql');
const db = require('./configs/db');
const pool = mysql.createPool(db);

function test() {
  const sql = "SELECT * FROM `vue-admin`.customer limit 500";
  console.log(sql)
  pool.getConnection((err, conn) => {
    conn.query(sql, (err, rows) => {
      if (err) {console.log(err)}
      conn.release()
    })
  })
}

test()