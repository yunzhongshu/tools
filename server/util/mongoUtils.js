var dburl = require("../config").dbUrl;//数据库地址
var mongoose = require('mongoose'),
    Admin = mongoose.mongo.Admin,
    Schema = mongoose.Schema;
var Promise = require("bluebird");
var IDSchema, IDModel;

exports.connect = function(callback) {
  mongoose.connect(dburl);

  IDSchema = new Schema({
    table: String,
    id: Number
  });
  IDModel = mongoose.model('ids', IDSchema);
};

exports.mongoObj = function(){
	return 	mongoose;
};

// create a connection to the DB
exports.CreateConnection=function(callback,returnFunc){
    var connection = mongoose.createConnection(dburl);

    connection.on('open', function() {
      callback(connection,Admin,returnFunc);
    });
}

/**
 * 获取并自动增长id
 * @param table
 */
exports.incId = function(table) {
  return new Promise(function (resolve, reject) {
    IDModel.findOneAndUpdate({table: table}, {$inc: {id: 1}}, function (err, idModel) {
      if (err) {
        reject(err);
      } else {
        var id = 0;
        if (!idModel) {
          IDModel.create({table:table, id: 1});
        } else {
          id = idModel.id;
        }
        resolve(id);
      }
    });
  });
}
