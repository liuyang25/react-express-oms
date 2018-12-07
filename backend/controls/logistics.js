
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


	listLogisticsMsg(req,res){
		let order_code = req.body.order_code;
		console.log(order_code);
		let sql = 'select logistics_msg from orders where order_code = ?';
		let arr = [order_code];
		func.connPool(sql, arr, (err, rows) => {
			console.log(rows[0]);
			if(rows[0].logistics_msg != null && rows[0].logistics_msg != ''){
				res.json({
					code: 200,
					msg: 'ok',
					list: JSON.parse(rows[0].logistics_msg)
				});
			}else{
				res.json({
					code: 200,
					msg: 'ok',
					list: []
				});
			}
			
		});
	},

};
