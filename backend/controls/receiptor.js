let mysql = require('mysql');
let func = require('../sql/func');
const { dateFormat } = require('../utils/common');

module.exports = {
  addReceiptor(req, res) {
    let {
      primaeval_customer,
      customer_id,
      componey_name,
      address,
      principal,
      contact,
      main_business,
      comment
    } = req.body
    let date = req.body 

    let newtime = dateFormat(new Date(), 'YYYY-MM-DD hh:mm:ss');
    let user_name = req.session.login.user_name;
    
    const sql = 'insert into customer_receipt(primaeval_customer,customer_id,componey_name,address,principal,contact,main_business,comment'
                + ',creator,updator,update_time) values(?,?,?,?,?,?,?,?,?,?,?)';
    const arr = [primaeval_customer,customer_id,componey_name,address,principal,contact,main_business,comment,user_name,user_name,newtime]
    func.connPool(sql, arr, (err, rows) => {
      if (err) {
        res.send({code:100, msg:'内部错误'})
        return;
      }
      res.send({code:200, msg: 'ok'});
    })
  },

  listReceiptor(req, res) {
    let primaeval_customer = req.body.primaeval_customer;
    let sql,arr;

    sql = "select * from customer_receipt where primaeval_customer = ? order by update_time";
    arr = [primaeval_customer];
		func.connPool(sql, arr, (err, rows) => {
			res.json({
				code: 200,
				msg: 'ok',
        list: rows,
			});
    });

  },

updateReceiptor(req, res) {
    let {
      id,
      primaeval_customer,
      customer_id,
      componey_name,
      address,
      principal,
      contact,
      main_business,
      comment
    } = req.body

    let newtime = dateFormat(new Date(), 'YYYY-MM-DD hh:mm:ss');

    const sql = 'update customer_receipt set customer_id = ?,componey_name = ?,address = ?,principal = ?,contact = ?,main_business = ?'
    + ',comment = ?,updator = ?,update_time = ? where id = ?';
    const arr = [customer_id,componey_name,address,principal,contact,main_business,comment,req.session.login.user_name,newtime,id]
    func.connPool(sql, arr, (err, rows) => {
      if (err) {
        res.send({code:100, msg:'内部错误'})
        return;
      }
      res.send({code:200, msg: 'ok'});
    })
  },

  detailReceiptor(req, res) {
    let id = req.body.id;
    let sql,arr; 
    sql = "select * from customer_receipt where id = ?";
    arr = [id];
		func.connPool(sql, arr, (err, rows) => {
      if(rows.length<1){
        res.json({
          code: 100,
          msg: '数据不存在',
        });
        return;
      }
			res.json({
				code: 200,
				msg: 'ok',
				details: rows[0]
			});
		});

  },

  
}
