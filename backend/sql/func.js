let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);

module.exports = {
    connPool (sql, val, cb) {
        pool.getConnection((err, conn) => {
            let q = conn.query(sql, val, (err, rows) => {
                if (err) {
                    console.log(err);
                }
                cb(err, rows);

                conn.release();
            });
        });
    },
    
    // json格式
    writeJson(res, code = 200, msg = 'ok', data = null) {
        let obj = {code, msg, data};

        if (!data) {
            delete obj.data;
        }

        res.send(obj);
    },
    
    query( sql, values ) {
        // 返回一个 Promise
        return new Promise(( resolve, reject ) => {
          pool.getConnection(function(err, connection) {
            if (err) {
              reject( err )
            } else {
              connection.query(sql, values, ( err, rows) => {
                if ( err ) {
                  reject( err )
                } else {
                  resolve( rows )
                }
                // 结束会话
                connection.release()
              })
            }
          })
        })
      }
      
};