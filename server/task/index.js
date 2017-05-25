var mongoose = require("mongoose");

var dbIdService = require('./db-id');
var dbGroupService = require('./db-group');
var dbItemService = require('./db-item');

var ResultFac = require('./../result');

mongoose.connect('mongodb://localhost:27017/task');
var db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
  //一次打开记录
});

dbIdService.init(mongoose);
dbGroupService.init(mongoose);
dbItemService.init(mongoose);

var startTaskService = function (server) {
  // 查询分组信息
  server.post('/task/list_groups.json', function(req, res, next) {
    var reqParam = req.body;
    dbGroupService.listGroups(reqParam).then(function(list) {
      res.send(ResultFac.returnSuccess(list));
    }).catch(function(err) {
      req.send(ResultFac.returnError(err.message));
    })
  });

  server.post('/task/save_group.json', function(req, res, next) {
    var reqParam = req.body;
    dbGroupService.saveGroup(reqParam.name);
    res.send(ResultFac.returnSuccess(true))
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

    dbIdService.incId('TaskItem', function(id) {
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
