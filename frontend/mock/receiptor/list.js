const demo = {
  id: 1,
  customer_id: '323424',
  compony_name: 'sda',
  address: 'ret',
  principal: 'fdfs',
  contact: '非凡哥',
  main_business: '323424',
  comment: '323424',
  creator: '323424',
  updator: null,
  create_time: '2018-11-21T08:26:20.000Z',
  update_time: '2018-11-21T08:26:20.000Z'
}
module.exports = function(req, res) {
  const cur_page = req.body.cur_page || 1
  let r = cur_page * 10 + 1
  const list = []
  for (let i = r; i < r + 10; i++) {
    demo.id = i
    demo.customer_id = i
    demo.compony_name = 'hehe' + i
    list.push(JSON.parse(JSON.stringify(demo)))
  }
  return {
    code: 200,
    msg: 'ok',
    total: 200,
    cur_page,
    list
  }
}
