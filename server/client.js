var assert = require('assert');
var clients = require('restify-clients');

var client = clients.createJsonClient({

  url: 'http://localhost:8888',
  version: '~1.0',
  headers: {
    // 'Content-Type': 'application/x-www-form-url-encoded;charset=UTF-8'
    'Content-Type': 'application/json;charset=UTF-8'
  }

});


client.post('/task/save_group.json', {id: 1, name: 'test'}, function(err, req, res, obj) {
  console.log(obj);
});

// client.get('/task/list_groups.json', function(err, req, res, obj) {
//   console.log(obj);
// });
