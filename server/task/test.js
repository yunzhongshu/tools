var mongoose = require("mongoose");

var dbIdService = require('./db-id');
var dbGroupService = require('./db-group');

mongoose.connect('mongodb://localhost:27017/task');
var db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){

})

dbIdService.init(mongoose);
dbGroupService.init(mongoose);

// dbIdService.incId('test').then(function (id) {
//   console.log(id)
// }).catch(function (err) {
//   console.log(err);
// })

// dbGroupService.listGroups({}).then(function(list) {
//   console.log(list);
// });

console.log(Date.now());
