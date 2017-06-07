var restify = require('restify');
var plugins = require('restify-plugins');

var router = require('./router');
var config = require('./config');
var mongoHelper = require("./util/mongoUtils")

const server = restify.createServer({
  name: 'my tools',
  version: '1.0.0'
});

server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());

server.listen(config.port, function () {
  console.log('%s listening at %s', server.name, server.url);

  router.registerApi(server);
});

mongoHelper.connect(function(error){
  if (error) throw error;
});
server.on('close', function(errno) {
  mongoHelper.disconnect(function(err) {
  });
});
