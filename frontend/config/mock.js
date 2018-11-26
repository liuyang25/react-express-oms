const fs = require('fs');

/**
 * 从缓存中移除module
 */
function clearCache(moduleName) {
  // 遍历缓存来找到通过指定模块名载入的文件
  searchCache(moduleName, function(mod) {
    delete require.cache[mod.id];
  });

  // 删除模块缓存的路径
  // 多谢@bentael指出这点
  Object.keys(module.constructor._pathCache).forEach(function(cacheKey) {
    if (cacheKey.indexOf(moduleName) > 0) {
      delete module.constructor._pathCache[cacheKey];
    }
  });
}

/**
 * 遍历缓存来查找通过特定模块名缓存下的模块
 */
function searchCache(moduleName, callback) {
  //  通过指定的名字resolve模块
  var mod = require.resolve(moduleName);

  // 检查该模块在缓存中是否被resolved并且被发现
  if (mod && (mod = require.cache[mod]) !== undefined) {
    // 递归的检查结果
    (function traverse(mod) {
      // 检查该模块的子模块并遍历它们
      mod.children.forEach(function(child) {
        traverse(child);
      });
      // 调用指定的callback方法，并将缓存的module当做参数传入
      callback(mod);
    })(mod);
  }
}

function isExist(filename) {
  const res =  fs.existsSync(filename);
  if (res){
    clearCache(filename);
  }
  return res;
}

module.exports = function(app) {
  app.all('/mock/*', function(req, res) {
    var filename = req.path.substring(0, req.path.lastIndexOf('.'))||req.path;
    var dirName = __dirname + '/../mock/';
    filename = filename.replace('/mock/', '');

    // res.sendFile(dirName + '/mock/' + filePath);
    let result = {};
    if (isExist(dirName + filename + '.json')){
      result = require(dirName + filename + '.json');
      // res.sendFile(dirName + filename + '.json');
      // return;
    } else if (isExist(dirName + filename + '.js')) {
      result = require(dirName + filename + '.js')();
    } else {
      result = {
        respCode: 0,
        respMsg: 'api not found'
      };
    }
    res.send(result);
  });
};
