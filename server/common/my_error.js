var restify = require('restify');
var util = require('util');

function MyError(message) {
  restify.RestError.call(this, {
    restCode: 'MyError',
    statusCode: 418,
    message: message,
    constructorOpt: MyError
  });
  this.name = 'MyError';
}

function DBError(message) {
  restify.RestError.call(this, {
    restCode: 'DBError',
    statusCode: 500,
    message: message ? message : '数据库异常',
    constructorOpt: MyError
  });
  this.name = 'DBError';
}

util.inherits(MyError, restify.RestError);
util.inherits(DBError, restify.RestError);

module.exports = {
  MyError: MyError,
  DBError: DBError
};
