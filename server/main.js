var restify = require('restify');
var plugins = require('restify-plugins');

var taskService = require('./task');

const server = restify.createServer({
  name: 'my tools',
  version: '1.0.0'
});

server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());

server.listen(8888, function () {
  console.log('%s listening at %s', server.name, server.url);
});


taskService.start(server);
