let sql = require('../sql/sql');
let moment = require('moment');
let bcrypt = require('bcryptjs');
let func = require('../sql/func');
let mysql = require('mysql');



function formatData(rows) {
	return rows.map(row => {
		let date = moment(row.create_time).format('YYYY-MM-DD');
		let obj = {};

		switch (row.role) {
			case 1:
				obj.role = '普通用户';
				break;
			case 10:
				obj.role = '管理员';
				break;
			case 0:
				obj.role = '超级管理员';
		}

		return Object.assign({}, row, {
			create_time: date
		}, obj);

	});
}


module.exports = {

	fetchAll(req, res) {
		
		let cur_page =req.body.cur_page || 1;
		let sql, arr ,endLimit ,startLimit;
		endLimit =  10;
		startLimit =  (cur_page-1)*10;
		// sql ='select * from user  limit ?, ?';
		sql ='select * from user';
		arr = [startLimit , endLimit];
		func.connPool(sql, arr, (err, rows) => {
			rows = formatData(rows);
			res.json({
				code: 200,
				msg: 'ture',
				resultList: rows
			});

		});
	},

	// 添加用户
	async addOne(req, res) {
		let name = req.body.user_name;
		let pass = req.body.password;
		let role = req.body.role || 1;
		let account = req.body.account;
		let sql = 'INSERT INTO user(user_name, account,password,role) VALUES(?,?,?,?)';
		let arr = [name,account, pass, role];
		
		if (!account || !pass || !name) {
			res.send({code:100, msg:'账号、密码、用户名不能为空'});
			return;
		  }
	  
		  let result = await func.query('select count(account) as sum from user  where account = ?', account);
		  if(result[0].sum > 0 ){
			res.send({code:100, msg:'账号不能重复'});
			return;
		  }

		func.connPool(sql, arr, (err, rows) => {
			res.json({
				code: 200,
				msg: 'ture'
			});
		});
	},

	// 修改用户名和密码
	updateOne(req, res) {
		let name = req.body.user_name;
		let pass = req.body.password;
		let role = req.body.role;
		let account = req.body.account;
		let sql = 'update user set user_name=?,password=? where account=?';
		let arr = [name, pass,account];

		if (!account || !pass || !name) {
			res.send({code:100, msg:'账号、密码、用户名不能为空'});
			return;
		  }
	  
		func.connPool(sql, arr, (err, rows) => {
			res.json({
				code: 200,
				msg: 'ture'
			});
		});
	},



	// 删除用户

	deleteOne(req, res) {

		let account = req.body.account;
		var sql = 'DELETE  from user WHERE id = ? ' ;
		let arr = [account];

		func.connPool(sql, arr, (err, rows) => {
			res.json({
				code: 200,
				msg: 'ture'
			});
		});

	},





	// 批量删除

		deleteMulti(req, res) {
		let id = req.body.id;

		let sql = 'DELETE  from user WHERE id in ?';
		let arr = [[id]];

		func.connPool(sql, arr, (err, rows) => {
			res.json({
				code: 200,
				msg: 'ture'
			});
		});



	},

	
	
	
	
	
	
	
	

	// 登录
	login(req, res) {
		let account = req.body.account;
		let password = req.body.password || '';


			let sql = 'select * from user WHERE account = ? ';
		
			let arr = [account];
		    console.log(arr);
			func.connPool(sql, arr, (err, rows) => {
				console.log(err);
				if (!rows.length) {
					res.json({
						code: 400,
						msg: '用户名不存在'
					});
					return;
				}
				console.log(rows);
				let pass = rows[0].password;
				if(password != pass){
					res.json({
						code: 400,
						msg: '密码错误'
					});
					return;
				}
				let user = {
					account: rows[0].account,
					user_name: rows[0].user_name,
					role: rows[0].role,
				};
				req.session.login = user;
				res.json({
					code: 200,
					msg: '登录成功',
					user: user
				});


		});
		
		
		
		



	},


	// 自动登录
	autoLogin(req, res) {
		let user = req.session.login;
		// console.log(req.session);
		if (user) {
			res.json({
				code: 200,
				msg: '自动登录',
				user: user
			});

		} else {
			res.json({
				code: 400,
				msg: 'not found'
			});
		}
	},

	// 注销
	logout(req, res) {
		req.session.login = null;

		res.json({
			code: 200,
			msg: '注销'
		});
	},

	// 权限控制
	controlVisit(req, res, next) {
		if (req.session.login.role && req.session.login.role < 10) {
			res.json({
				code: 400,
				msg: '权限不够'
			});
			return;
		}

		next();
	},

	// 权限变更
	changeRole(req, res) {
		let role = req.session.login.role;
		let change_role = req.body.change_role;

		if (role !== 100 && change_role === 100) {
			res.json({
				code: 400,
				msg: '权限不够'
			});
			return;
		}

		let user_id = req.body.id;	

		let sql = 'UPDATE user SET role= ? WHERE id =?';
		let arr = [change_role,user_id];

		func.connPool(sql, arr, (err, rows) => {
			if (rows.affectedRows) {
					res.json({
						code: 200,
						msg: 'ture'
					});
				}
		});

		
	},
	

};
