var  Promise = require("bluebird"),
  TABLE = 'TaskItem',
  dbIdService = require('./db-id'),
  ErrorHandler = require('../utils').errorHandler,
  Schema,
  TaskItemSchema,
  TaskItemModel;

var init = function(mongoose) {
  Schema = mongoose.Schema;
  TaskItemSchema = new Schema({
    id: Number,
    title: String,
    groupId: Number,
    finished: Boolean,
    deleted: Boolean,
    createTime: Date.now(),
    updateTime: Date.now(),
  });
  TaskItemModel = mongoose.model('TaskItem', TaskItemSchema);

  Promise.promisifyAll(TaskItemModel);
}

var saveItem = function (title, groupId) {
  dbIdService.incId(TABLE).then(function(id) {
    new TaskItemModel({
      id: id,
      title: title,
      groupId: groupId,
      finished: false,
      deleted: false,
      createTime: Date.now(),
      updateTime: Date.now()
    }).save();
  }).catch(ErrorHandler);
};

var listItems = function (queryItem) {
  return TaskItemModel.find(queryItem);
};

var finishItem = function (id) {
  return TaskItemModel.update({id: id}, {$set: {finished: true}});
}

var deleteItem = function (id) {
  return TaskItemModel.update({id: id}, {$set: {deleted: true}});
}


module.exports = {
  init: init,
  saveItem: saveItem,
  listItems: saveItem,
  finishItem: finishItem,
  deleteItem: deleteItem
}
