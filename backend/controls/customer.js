let mysql = require('mysql')
let func = require('../sql/func')
const { dateFormat } = require('../utils/common')

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
   let user_name = req.session.login.user_name;
   let newtime = dateFormat(new Date(time), 'YYYY-MM-DD hh:mm:ss');

    if (!customer_id) {
      res.send({code:100, msg:'客户代码不能为空'});
      return;
    }

    func.connPool('select * from customer  where customer_id = ?', customer_id, (err, rows) => {
      if (rows.length > 0) {
        res.send({code:100, msg:'客户代码不能重复'})
        return;
      }
    })

    const sql = 'insert into customer(customer_id,compony_name,address,principal,contact,main_business,'
                + 'comment,creator,updator,update_time) values(?,?,?,?,?,?,?,?,?,?)';
    const arr = [customer_id,compony_name,address,principal,contact,main_business,comment,user_name,user_name,newtime]
    func.connPool(sql, arr, (err, rows) => {
      if (err) {
        res.send({code:100, msg:'内部错误'})
        return;
      }
      res.send({code:200, msg: 'ok'});
    })
  },

  async listCustomer(req, res) {
    let cur_page = req.body.cur_page || 1;
    let sql,arr,endLimit, startLimit,sum_sql,total_page,total,sum_arr;
    let comment = '%' + req.body.search_param + '%';

		endLimit = 10;
    startLimit = (cur_page-1) * 10;
    sql = "select * from customer where customer_id like ? and compony_name like ? and address like ? "
    +  "and principal like ? and contact like ? and main_business like ? and comment like ?  limit ?, ?";

    sum_sql = "select count(customer_id) as sum from customer where customer_id like ? and compony_name like ? and address like ? "
    +  "and principal like ? and contact like ? and main_business like ? and comment like ?";

    console.log(endLimit);
    console.log(startLimit);

    arr = [comment,comment,comment,comment,comment,comment,comment, startLimit,endLimit];
    sum_arr = [comment,comment,comment,comment,comment,comment,comment];
  
    total = await func.query(sum_sql,arr);
    console.log(await func.query(sum_sql,arr));
    console.log(total);
		func.connPool(sql, arr, (err, rows) => {
			res.json({
				code: 200,
				msg: 'ok',
        list: rows,
        cur_page:cur_page,
        total:total[0].sum
			});
    });

  },

updateCustomer(req, res) {
    let {
      customer_id,
      compony_name,
      address,
      principal,
      contact,
      main_business,
      comment
    } = req.body

    let newtime = dateFormat(new Date(time), 'YYYY-MM-DD hh:mm:ss');

    const sql = 'update customer set compony_name = ?,address = ?,principal = ?,contact = ?,main_business = ?'
    + ',comment = ?,updator = ?,update_time = ? where customer_id =?';
    const arr = [compony_name,address,principal,contact,main_business,comment,req.session.login.user_name,newtime,customer_id]
    func.connPool(sql, arr, (err, rows) => {
      if (err) {
        res.send({code:100, msg:'内部错误'})
        return;
      }
      res.send({code:200, msg: 'ok'});
    })
  },

  detailCustomer(req, res) {
    let customer_id = req.body.customer_id;
    let sql,arr; 
    sql = "select * from customer where customer_id = ?";
    arr = [customer_id];
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
