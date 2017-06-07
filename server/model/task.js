var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// 任务分组
var TaskGroupSchema = new Schema({
  id: Number,
  name: String,
  taskCount: Number,
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now },
  status: String
});

// 任务列表
var TaskItemSchema = new Schema({
  id: Number,
  title: String,
  groupId: Number,
  finished: Boolean,
  deleted: Boolean,
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now },
});

mongoose.model('TaskGroup', TaskGroupSchema);
mongoose.model('TaskItem', TaskItemSchema);

exports.Scheme = function (modelName) {
  return {
    model: mongoose.model(modelName)
  }
};

