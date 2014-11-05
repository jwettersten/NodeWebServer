var net = require('net');

var TCPServer = new net.createServer(function(connListener) {
  console.log('server connected');

  connListener.on('end', function() {
    console.log('server disconnected');
  });

  connListener.write('hey dude.');
  connListener.pipe(connListener);

});

TCPServer.listen(8080, function() {
  console.log('server bound');
});
