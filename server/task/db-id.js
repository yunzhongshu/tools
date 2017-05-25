var
  Promise = require("bluebird"),
  Schema,
  IDSchema,
  IDModel;

var init = function(mongoose) {
  Schema = mongoose.Schema;
  IDSchema = new Schema({
    table: String,
    id: Number
  });
  IDModel = mongoose.model('ids', IDSchema);
}

var incId = function(table) {
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

module.exports = {
  init: init,
  incId : incId
}
