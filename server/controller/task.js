var mongoHelper = require('../util/mongoUtils');
var TaskGroupModel = require('../model/task').Scheme('TaskGroup').model;
var TaskItemModel = require('../model/task').Scheme('TaskItem').model;
var DBError = require('../common/my_error').DBError;

/**
 * 保存分组
 * @param req
 * @param res
 * @param next
 */
exports.saveGroup = function (req, res, next) {
  var groupName = req.body.name;
  mongoHelper.incId('taskGroup').then(function(id) {
    new TaskGroupModel({
      id: id,
      name: groupName,
      taskCount: 0,
      createTime: Date,
      updateTime: Date,
      status: 'enabled'
    }).save(function (err) {
      if (err) {
        next(new DBError('保存分组失败'));
      }
      res.send(true);
      next();
    });
  }).catch(function (err) {
    next(new DBError('分配id失败'));
  });
};

/**
 * 查询分组
 * @param req
 * @param res
 * @param next
 */
exports.listGroups = function (req, res, next) {
  var queryParam = req.body;
  TaskGroupModel.find(queryParam).exec(function (err, list) {
    if (err) {
      next(new DBError())
    }
    res.send(list);
    next();
  });
};

/**
 * 更新分组状态
 * @param req
 * @param res
 * @param next
 */
exports.updateGroupStatus = function (req, res, next) {
  var id = req.id;
  var newStatus = req.newStatus;
  TaskGroupModel.update({id: id}, {$set: {status: newStatus}}).exec(function (err, number) {
    res.send(number)
    next();
  })
}

/**
 * 保存任务
 * @param req
 * @param res
 * @param next
 */
exports.saveItem = function (req, res, next) {
  var groupId = req.body.groupId;
  var title = req.body.title;
  mongoHelper.incId('taskItem').then(function(id) {
    new TaskItemModel({
      id: id,
      title: title,
      groupId: groupId,
      finished: false,
      deleted: false,
      createTime: Date.now(),
      updateTime: Date.now()
    }).save(function (err) {
      if (err) {
        next(new DBError('保存任务失败'))
      }
      res.send(true);
      next();
    });
  }).catch(function (err) {
    next(new DBError('分配id失败'));
  });
};

/**
 * 查询任务列表
 * @param req
 * @param res
 * @param next
 */
exports.listItems = function (req, res, next) {
  var queryParam = req.body;
  TaskItemModel.find(queryParam).exec(function (err, list) {
    if (err) {
      next(DBError())
    }
    res.send(list);
    next();
  })
};

/**
 * 完成任务
 * @param req
 * @param res
 * @param next
 */
exports.finishItem = function (req, res, next) {
  TaskItemModel.update({id: id}, {$set: {finished: true}}).exec(function (err, number) {
    if (err) {
      next(new DBError());
    }
    res.send(number);
    next();
  })
};

/**
 * 删除任务
 * @param req
 * @param res
 * @param next
 */
exports.deleteItem = function (req, res, next) {
  TaskItemModel.update({id: id}, {$set: {deleted: true}}).exec(function (err, number) {
    if (err) {
      next(new DBError());
    }
    res.send(number);
    next();
  })
};
