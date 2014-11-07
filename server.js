var net = require('net');
var fs = require('fs');

var PORT = 8080;

var TCPServer = new net.createServer(function(connListener) {
  var responseContent = 'HTTP/1.1 200 OK' + '\r\n';
  console.log('server connected');

  connListener.on('data', function(data) {
    console.log('data received from client: ' + data);

    var clientData = data.toString().split(' ');

    // check data and route appriately
    if (clientData[0] === 'GET') {
     if (clientData[1] === '/file1') {
        console.log('GET request for: ' + clientData[1]);
        var fileStream = fs.createReadStream('./public' + clientData[1]);
        fileStream.pipe(connListener);
      } else {
        connListener.write(responseContent + clientData[0]);
      }
    } else {
      // echo back to client
      connListener.write(responseContent + data);
    }

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
