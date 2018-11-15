let mysql = require('mysql')
let func = require('../sql/func')

module.exports = {
  addLogistics(req, res) {
    let {
      goods_code,
      time,
      information,
      comment,
    } = req.body

    if (!goods_code) {
      res.send({code:100, msg:'商品代码不能为空'});
      return;
    }
    const sql = 'insert into logistics(goods_code,time,information,comment,creator) values(?,?,?,?,?)';
    const arr = [goods_code,time,information,comment,req.session.login.user_name]
    func.connPool(sql, arr, (err, rows) => {
      if (err) {
        res.send({code:100, msg:'内部错误'})
        return;
      }
      res.send({code:200, msg: 'ok'});
    })
  },

  listLogistics(req, res) {
    let cur_page = req.body.cur_page || 1;
    let sql,arr,endLimit, startLimit;

		endLimit = cur_page * 10;
    startLimit = endLimit - 10;
    
    sql = 'select * from logistics  limit ?, ?';
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
