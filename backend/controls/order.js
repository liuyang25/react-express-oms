
let sql = require('../sql/sql');
let moment = require('moment');
let func = require('../sql/func');
let path = require('path');
const { dateFormat } = require('../utils/common');




function formatData(rows) {
	return rows.map(row => {
		let date = moment(row.create_time).format('YYYY-MM-DD');
		return Object.assign({}, row, {
			create_time: date
		});
	});
}


module.exports = {

   //添加订单
   async addOrder(req, res){
		let {order_code,customer_id,customer_name,good_name,good_amount,good_num,good_weight,good_volume,good_volume_detail,
			good_type,good_attr,customs_code,declared_value,receiving_time,receiving_name,receiving_address,
			receiving_contact,receiving_comment,carriage,additional_fee,recieved_fee,concerted_pay_date,
			reparations,logistics_company,logistics_orderid,logistics_cost,logistics_reparations,comment,
			logistics_completed,order_closed} = req.body;
		let user_name = req.session.login.user_name;
		let newtime = dateFormat(new Date(), 'YYYY-MM-DD hh:mm:ss');
		
		receiving_time = dateFormat(new Date(receiving_time), 'YYYY-MM-DD hh:mm:ss');
		concerted_pay_date = dateFormat(new Date(concerted_pay_date), 'YYYY-MM-DD hh:mm:ss');
		
		if (!customer_id) {
			res.send({code:100, msg:'客户代码不能为空'});
			return;
		}
		if (!customer_name) {
			res.send({code:100, msg:'客户名称不能为空'});
			return;
		}
		if (!order_code) {
			res.send({code:100, msg:'订单编号不能为空'});
			return;
		}

		let result = await func.query('select count(1) as sum from orders  where order_code = ?', order_code);
		if(result[0].sum > 0 ){
		  res.send({code:100, msg:'订单编号不能重复'});
		  return;
		}

		const sql = 'insert into orders(order_code,customer_id,customer_name,good_name,good_amount,good_num,good_weight,good_volume,good_volume_detail,'
			        + 'good_type,good_attr,customs_code,declared_value,receiving_time,receiving_name,receiving_address,'
			        + 'receiving_contact,receiving_comment,carriage,additional_fee,recieved_fee,concerted_pay_date,'
			        + 'reparations,logistics_company,logistics_orderid,logistics_cost,logistics_reparations,comment,'
		          	+ 'logistics_completed,order_closed,creator,updator,update_time)'
					+ 'values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
		const arr = [order_code,customer_id,customer_name,good_name,good_amount,good_num,good_weight,good_volume,good_volume_detail,
		            good_type,good_attr,customs_code,declared_value,receiving_time,receiving_name,receiving_address,
		            receiving_contact,receiving_comment,carriage,additional_fee,recieved_fee,concerted_pay_date,
		            reparations,logistics_company,logistics_orderid,logistics_cost,logistics_reparations,comment,
					logistics_completed,order_closed,user_name,user_name,newtime];
					
		  func.connPool(sql, arr, (err, rows) => {
			if (err) {
			  res.send({code:100, msg:'内部错误'})
			  return;
			}
			res.send({code:200, msg: 'ok'});
		  })

	},

	  

	// 获取订单列表

	async listOrder(req, res) {
		let {searchParam,selectLogisticsStatus,selectOrderStatus,orderDateStart,
			orderDateEnd,cur_page }= req.body;
		let endLimit = 10;
		let startLimit = (cur_page-1) * 10;
		let sql,arr;
		let comment = '%' + req.body.searchParam + '%';

		sql = 'from orders where (order_code like ? or customer_id like ? or customer_name like ? or good_name like ?'
			  + ' or receiving_name like ? or receiving_address like ? or receiving_contact like ? or logistics_company like ?'
			  + ' or logistics_orderid like ? or receiving_comment like ?) ';

		arr = [comment,comment,comment,comment,comment,comment,comment,comment,comment,comment];
		if(selectLogisticsStatus != ''){
			sql = sql + ' and logistics_completed = ?';
			arr.push(selectLogisticsStatus);
		}
		if(selectOrderStatus != ''){
			sql = sql + ' and order_closed = ?';
			arr.push(selectOrderStatus);
		}
		if(orderDateStart != ''){
			sql = sql + ' and receiving_time >= ?';
			arr.push(orderDateStart + ' 00:00:00')
		}
		if(orderDateEnd != ''){
			sql = sql + ' and receiving_time < ?';
			arr.push(orderDateEnd + ' 23:59:59');
		}
	   
		let sql_list = 'select * ' + sql + ' order by update_time DESC limit ?, ?';
		let arr_list = arr.concat();
		arr_list.push(startLimit);
		arr_list.push(endLimit);

		let sql_count = 'select count(1) as sum ' + sql;
		console.log(sql_count);
		console.log(arr);
		console.log(arr_list);
		

		let total = await func.query(sql_count,arr);
		console.log(total[0].sum);
	
		func.connPool(sql_list, arr_list, (err, rows) => {
			res.json({
					code: 200,
					msg: 'ok',
			        list: rows,
			        cur_page:cur_page,
			        total:total[0].sum
			 });
			 
		});

	},

	detailOrder(req, res) {
		let order_code = req.body.order_code;
		let sql,arr; 
		sql = "select * from orders where order_code = ?";
		arr = [order_code];
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

	updateOrder(req, res) {
		let {order_code,customer_id,customer_name,good_name,good_amount,good_num,good_weight,good_volume,good_volume_detail,
			good_type,good_attr,customs_code,declared_value,receiving_time,receiving_name,receiving_address,
			receiving_contact,receiving_comment,carriage,additional_fee,recieved_fee,concerted_pay_date,
			reparations,logistics_company,logistics_orderid,logistics_cost,logistics_reparations,comment,
			logistics_completed,order_closed} = req.body;
	
		let newtime = dateFormat(new Date(), 'YYYY-MM-DD hh:mm:ss');
		let user_name = req.session.login.user_name;
		receiving_time = dateFormat(new Date(receiving_time), 'YYYY-MM-DD hh:mm:ss');
		concerted_pay_date = dateFormat(new Date(concerted_pay_date), 'YYYY-MM-DD hh:mm:ss');
	
		const sql = 'update orders set good_name=?,good_amount=?,good_num=?,good_weight=?,good_volume=?,good_volume_detail=?,'
		+ 'good_type=?,good_attr=?,customs_code=?,declared_value=?,receiving_time=?,receiving_name=?,receiving_address=?,'
		+ 'receiving_contact=?,receiving_comment=?,carriage=?,additional_fee=?,recieved_fee=?,concerted_pay_date=?,'
		+ 'reparations=?,logistics_company=?,logistics_orderid=?,logistics_cost=?,logistics_reparations=?,comment=?,'
		  + 'logistics_completed=?,order_closed=?,updator=?,update_time=? where order_code=?';

        const arr = [good_name,good_amount,good_num,good_weight,good_volume,good_volume_detail,
		good_type,good_attr,customs_code,declared_value,receiving_time,receiving_name,receiving_address,
		receiving_contact,receiving_comment,carriage,additional_fee,recieved_fee,concerted_pay_date,
		reparations,logistics_company,logistics_orderid,logistics_cost,logistics_reparations,comment,
		logistics_completed,order_closed,user_name,newtime,order_code];
	
		func.connPool(sql, arr, (err, rows) => {
		  if (err) {
			res.send({code:100, msg:'内部错误'})
			return;
		  }
		  res.send({code:200, msg: 'ok'});
		})
	  },


	deleteOrder(req,res){
		let order_code = req.body.order_code;
		let sql = 'delete from orders where order_code = ?';
		let arr = [order_code];
		func.connPool(sql, arr, (err, rows) => {
			if (err) {
			  res.send({code:100, msg:'内部错误'})
			  return;
			}
			res.send({code:200, msg: 'ok'});
		  })
	},
   
	getDictOrder(req,res){
		let sql = 'select customer_id,componey_name from customer';
		func.connPool(sql, null, (err, rows) => {
			res.json({
			    code: 200,
			    msg: 'ok',
				list: rows
			});
  
		});

	},

	getReceiptorList(req,res){
		let primaeval_customer = req.body.primaeval_customer;
		let sql = 'select CONCAT(principal,", ",componey_name) as name, address,contact,comment from customer_receipt where primaeval_customer = ?';
		let arr = [primaeval_customer];
		func.connPool(sql, arr, (err, rows) => {
			res.json({
			    code: 200,
			    msg: 'ok',
				list: rows
			});
		});

	},

	getLogisticsMsg(req,res){
		let order_code = req.body.order_code;
		let sql = 'select logistics_msg from orders where order_code = ?';
		let arr = [order_code];
		func.connPool(sql, arr, (err, rows) => {
			res.json({
			    code: 200,
			    msg: 'ok',
				list: rows
			});
		});
	},

	updateLogisticsMsg(req,res){
		let logistics_msg = req.body.logistics_msg
		let order_code = req.body.order_code;
		let sql = 'update orders set logistics_msg = ? where order_code = ?';
		let arr = [logistics_msg,order_code];
		func.connPool(sql, arr, (err, rows) => {
			if (err) {
				res.send({code:100, msg:'内部错误'})
				return;
			  }
			  res.send({code:200, msg: 'ok'});
		});
	},

};
