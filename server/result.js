var extend = require('node.extend')

var success = {
  code: 200,
  msg: '成功',
  data: null
};

var error = {
  code: 500,
  msg: '服务器异常',
  data: null
}

var returnSuccess = function(data) {
  return extend(success, {data: data});
}

var returnError = function(msg, code){
  var _error = {};
  if (msg) {
    _error = extend(error, {msg: msg});
  }
  if (code) {
    _error = extend(error, {code: code});
  }
  return _error;
}

module.exports = {
  returnSuccess: returnSuccess,
  returnError: returnError
};
