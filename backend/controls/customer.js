let mysql = require('mysql');
let func = require('../sql/func');
const { dateFormat } = require('../utils/common');

module.exports = {
  async addCustomer(req, res) {
    let {
      customer_id,
      componey_name,
      address,
      principal,
      contact,
      main_business,
      comment
    } = req.body
   let user_name = req.session.login.user_name;
   let newtime = dateFormat(new Date(), 'YYYY-MM-DD hh:mm:ss');

    if (!customer_id) {
      res.send({code:100, msg:'客户代码不能为空'});
      return;
    }

    let result = await func.query('select count(customer_id) as sum from customer  where customer_id = ?', customer_id);
    if(result[0].sum > 0 ){
      res.send({code:100, msg:'客户代码不能重复'});
      return;
    }
   
    const sql = 'insert into customer(customer_id,componey_name,address,principal,contact,main_business,'
                + 'comment,creator,updator,update_time) values(?,?,?,?,?,?,?,?,?,?)';
    const arr = [customer_id,componey_name,address,principal,contact,main_business,comment,user_name,user_name,newtime]
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
    console.log(comment);
    
		endLimit = 10;
    startLimit = (cur_page-1) * 10;
    sql = "select * from customer where customer_id like ? or componey_name like ? or address like ? "
    +  "or principal like ? or contact like ? or main_business like ? or comment like ?  order by update_time DESC limit ?, ?";

    sum_sql = "select count(customer_id) as sum from customer where customer_id like ? or componey_name like ? or address like ? "
    +  "or principal like ? or contact like ? or main_business like ? or comment like ?";

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
      componey_name,
      address,
      principal,
      contact,
      main_business,
      comment
    } = req.body

    let newtime = dateFormat(new Date(), 'YYYY-MM-DD hh:mm:ss');

    const sql = 'update customer set componey_name = ?,address = ?,principal = ?,contact = ?,main_business = ?'
    + ',comment = ?,updator = ?,update_time = ? where customer_id =?';
    const arr = [componey_name,address,principal,contact,main_business,comment,req.session.login.user_name,newtime,customer_id]
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
