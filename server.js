var net = require('net');
var router = require('./router');
var constants = require('./constants');
var requestHandlers = require('./requestHandlers');

var handlers = {
  '/' : requestHandlers.listDirectory,
  'default' : requestHandlers.loadFile,
  'echo' : requestHandlers.echoRequest
};

var TCPServer = new net.createServer(function(connListener) {
  console.log('server connected');

  connListener.on('data', function(data) {
    console.log('data received from client: ' + data);
    router.route(data, handlers, connListener);
  });

  connListener.on('end', function() {
    console.log('server disconnected');
  });

  connListener.on('error', function(error) {
    console.log('Error thrown: ' + error);
  });
});

TCPServer.listen(constants.PORT, function() {
  console.log('server has been bound and now listening!');
});
