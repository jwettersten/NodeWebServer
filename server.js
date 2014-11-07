var net = require('net');
var fs = require('fs');
var router = require('./router');

var PORT = 8080;

var TCPServer = new net.createServer(function(connListener) {
  console.log('server connected');

  connListener.on('data', function(data) {
    console.log('data received from client: ' + data);

    router.route(data, connListener);

  });

  connListener.on('end', function() {
    console.log('server disconnected');
  });

  connListener.on('error', function(error) {
    console.log('Error thrown: ' + error);
  });

});

TCPServer.listen(PORT, function() {
  console.log('server has been bound and now listening!');
});
