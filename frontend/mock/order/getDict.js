const demo = {
  customer_id: '323424',
  componey_name: 'sda'
}
module.exports = function(req, res) {
  const list = []
  for (let i = 0; i < 10; i++) {
    demo.customer_id = i
    demo.componey_name = 'hehe' + i
    list.push(JSON.parse(JSON.stringify(demo)))
  }
  return {
    code: 200,
    msg: 'ok',
    total: 200,
    list
  }
}
