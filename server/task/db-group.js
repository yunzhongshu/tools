var  Promise = require("bluebird"),
  TABLE = 'TaskGroup',
  dbIdService = require('./db-id'),
  ErrorHandler = require('../utils').errorHandler,
  Schema,
  TaskGroupSchema,
  TaskGroupModel;



var init = function(mongoose) {
  Schema = mongoose.Schema;
  TaskGroupSchema = new Schema({
    id: Number,
    name: String,
    taskCount: Number,
    createTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },
    status: String
  });
  TaskGroupModel = mongoose.model('TaskGroup', TaskGroupSchema);

  Promise.promisifyAll(TaskGroupModel);
}

var saveGroup = function (groupName) {
  dbIdService.incId(TABLE).then(function(id) {
    new TaskGroupModel({
      id: id,
      name: groupName,
      taskCount: 0,
      createTime: Date.now(),
      updateTime: Date.now(),
      status: 'enabled'
    }).save();
  }).catch(ErrorHandler);
};

var listGroups = function (queryGroup) {
  return TaskGroupModel.find(queryGroup);
};


var updateGroupStatus = function (id, newStatus) {
  return TaskGroupModel.update({id: id}, {$set: {status: newStatus}});
}



module.exports = {
  init: init,
  saveGroup: saveGroup,
  listGroups: listGroups,
  updateGroupStatus: updateGroupStatus
}


