var net = require('net');
var fs = require('fs');

// Create socket file
fs.open('/Users/jwettersten/Documents/Projects/NodeWebServer/node.sock', 'w+', function(err, fdesc) {
  if (err || !fdesc) {
    throw 'Error: ' + (err || 'No fdesc');
  }

  var socketServer = new net.Socket({
    fd: [0, 1, 2],
    allowHalfOpen: true,
    readable: true,
    writable: true
  });

  socketServer.write('Hey dude');
  socketServer.end();

});


