var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ResultFac = require('./result');

mongoose.connect('mongodb://localhost:27017/task');
var db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
  //一次打开记录
});

var IDSchema = new Schema({
  table: String,
  id: Number
});

var TaskGroupSchema = new Schema({
  id: Number,
  name: String,
  taskCount: Number,
  status: String
});

var TaskItemSchema = new Schema({
  id: Number,
  name: String,
  groupId: Number,
  finished: Boolean
});


var IDModel = mongoose.model('ids', IDSchema);
var TaskGroupModel = mongoose.model('TaskGroup', TaskGroupSchema);
var TaskItemModel = mongoose.model('TaskItem', TaskItemSchema);

var incId = function(table, callback) {
  IDModel.findOneAndUpdate({table: table}, {$inc: {id: 1}}, function (err, idModel) {
    if (!err && callback && callback instanceof Function ) {
      var id = 0;
      if (!idModel) {
        IDModel.create({table:table, id: 1});
      } else {
        id = idModel.id;
      }
      callback(id);
    }
  });
}

var startTaskService = function (server) {
  // 查询分组信息
  server.get('/task/list_groups.json', function(req, res, next) {
    TaskGroupModel.find({}).exec(function (err, list){
      if (err) {
        req.send(ResultFac.returnError(err.message));
      } else {
        res.send(ResultFac.returnSuccess(list));
      }
    })
  });

  server.post('/task/save_group.json', function(req, res, next) {
    var reqParam = req.body;

    incId('TaskGroup', function(id) {
      var taskGroup = new TaskGroupModel({
        id: id,
        name: reqParam.name,
        taskCount: 0,
        status: 'enabled'
      });
      taskGroup.save();
      res.send(ResultFac.returnSuccess(true))
    })

  });

  server.post('/task/list_items.json', function(req, res, next) {
    var reqParam = req.body;
    var groupId = reqParam.groupId;
    var finished = reqParam.finished ? reqParam.finished : false;
    TaskItemModel.find({groupId: groupId, finished: finished}).exec(function (err, list){
      if (err) {
        req.send(ResultFac.returnError(err.message));
      } else {
        res.send(ResultFac.returnSuccess(list));
      }
    })
  });

  server.post('/task/save_item.json', function(req, res, next) {
    var reqParam = req.body;

    incId('TaskItem', function(id) {
      var taskItem = new TaskItemModel({
        id: id,
        name: reqParam.name,
        groupId: reqParam.groupId,
        finish: false
      });
      taskItem.save();
      res.send(ResultFac.returnSuccess(true))
    })

  });

  server.post('/task/finish_task.json', function(req, res, next) {
    var reqParam = req.body;

    TaskItemModel.update({id: reqParam.id}, {$set: {finish: true}}, function(err, obj) {
      if (!err) {
        res.send(ResultFac.returnSuccess(true));
      }
    });

  });

};


module.exports = {
  start: startTaskService
}
