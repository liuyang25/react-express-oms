module.exports = routerRejHandler;

// 对ctrlRejHandler稍作修改，使其支持一般的function
function ctrlRejHandler(ctrl) {
  if (typeof ctrl !== 'function') throw Error('Try to use ctrlRejHandler to decorate an Object not a function');
  if ({}.toString.call(ctrl) !== '[object AsyncFunction]') {
    return function (req, res, next) {
      try {
        return ctrl(req, res, next);
      } catch(err){
        console.error(err);
        res.send('内部错误');
      }
    };
  }
  return function (req, res, next) {
    return ctrl(req, res, next).catch(rej => {
      console.warn('错误处理装饰器 捕获错误', rej);
      res.send('内部错误');
    });
  };
};

// router装饰器，自动对控制器进行错误捕获
function routerRejHandler(router) {
  const methods = require('methods');
  [...methods, 'all'].forEach(method => {
    if (router[method]) {
      router[method] = function (path, ...fns) {
        const route = this.route(path);
        const ctrlIndex = fns.length - 1;
        // 只认为最后一个回调函数参数为控制器，之前的为中间件
        fns[ctrlIndex] = ctrlRejHandler(fns[ctrlIndex]);
        route[method].apply(route, fns);
        return this;
      };
    }
  });
  return router;
}