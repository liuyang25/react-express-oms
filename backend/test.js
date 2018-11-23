const mysql = require('mysql');
const db = require('./configs/db');
const pool = mysql.createPool(db);

test(){
  sql = 'insert into customer'
  pool.getConnection((err, conn) => {
    let i = 20000
    let step = 20000
    while (i > 0) {
      //INSERT INTO `vue-admin`.`customer` (`customer_id`) VALUES ('2');
      conn.query(`insert into customer (\`customer_id\`, \`compony_name\`, \`address\`, \`principal\`, \`contact\`, \`main_business\`, \`comment\`, \`creator\`) values('test${i}', 'testname${i}', 'testaddress${i}', 'testp${i}', 'testcontact${i}', 'testm${i}', 'hehe${i}', 'hehe')`, (err, rows) => {
        if (err) {
          console.log(err)
        }
        step--
        if (step === 0) {
          conn.release()
        }
      })
      i--
    }
  })
}
test()