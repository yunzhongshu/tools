var taskController = require('./controller/task');

exports.registerApi = function (server) {

  server.post('/task/list_groups.json', taskController.listGroups);

  server.post('/task/save_group.json',  taskController.saveGroup);

  server.post('/task/list_items.json', taskController.listItems);

  server.post('/task/save_item.json', taskController.saveItem);

  server.post('/task/finish_task.json', taskController.finishItem);

  server.post('/task/delete_task.json', taskController.deleteItem);

};
