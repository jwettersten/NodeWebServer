var net = require('net');

var PORT = 8080;

var TCPServer = new net.createServer(function(connListener) {
  var responseContent = 'HTTP/1.1 200 OK' + '\r\n';
  console.log('server connected');

  connListener.on('end', function() {
    console.log('server disconnected');
  });

  connListener.on('data', function(data) {
    console.log('data received from client: ' + data);
    // echo back to client
    connListener.write(data);
  });

  connListener.write(responseContent);
});

TCPServer.listen(PORT, function() {
  console.log('server has been bound and now listening!');
});
