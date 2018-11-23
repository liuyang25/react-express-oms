const mysql = require('mysql');
const db = require('./configs/db');
const pool = mysql.createPool(db);


function test() {
  const sql = "SELECT * FROM `vue-admin`.customer where customer_id like '%%' and compony_name like '%test%' and address like '%%' and  principal like '%%' limit 500";
  console.log(sql)
  pool.getConnection((err, conn) => {
    conn.query(sql, (err, rows) => {
      if (err) {console.log(err)}
      console.log(rows.length)
      conn.release()
    })
  })
}
test();