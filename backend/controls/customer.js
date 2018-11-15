let mysql = require('mysql')
let func = require('../sql/func')

module.exports = {
  addCustomer(req, res) {
    let {
      customer_id,
      compony_name,
      address,
      principal,
      contact,
      main_business,
      comment
    } = req.body

    if (!customer_id) {
      res.send({code:100, msg:'客户代码不能为空'});
      return;
    }
    const sql = 'insert into customer(customer_id,compony_name,address,principal,contact,main_business,comment,creator) values(?,?,?,?,?,?,?,?)';
    const arr = [customer_id,compony_name,address,principal,contact,main_business,comment,req.session.login.user_name]
    func.connPool(sql, arr, (err, rows) => {
      if (err) {
        res.send({code:100, msg:'内部错误'})
        return;
      }
      res.send({code:200, msg: 'ok'});
    })
  },

  listCustomer(req, res) {
    let cur_page = req.body.cur_page || 1;
    let sql,arr,endLimit, startLimit;

		endLimit = cur_page * 10;
    startLimit = endLimit - 10;
    
    sql = 'select * from customer  limit ?, ?';
    arr = [startLimit, endLimit];

		func.connPool(sql, arr, (err, rows) => {
			res.json({
				code: 200,
				msg: 'ok',
				resultList: rows
			});

		});

  }
}
