module.exports = function(req, res) {
  if (Math.random() < 0.5) {
    return {
      code: 100,
      msg: 'test error'
    }
  } else {
    return {
      code: 200,
      msg: 'hehe'
    }
  }
}
