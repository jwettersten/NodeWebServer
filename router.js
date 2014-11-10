var fs = require('fs');
var Readable = require('stream').Readable;
var util = require('util');

function route(pathData, connListener) {
  var responseContent = 'HTTP/1.1 200 OK' + '\r\n';
  var responseFileHeader = 'Content-Type: text/html' + '\r\n' + 'Content-Length: 35' + '\r\n';

  var clientData = pathData.toString().split(' ');

  // check data and route appriately
  if (clientData[0] === 'GET') {
    if (clientData[1] === '/file1') {
      console.log('GET request for: ' + clientData[1]);

      var rs = new Readable();
      rs.push(responseContent);
      rs.push(responseFileHeader);

      var fileStream = fs.createReadStream('./public' + clientData[1]);

      fileStream.on('end', function() {
        console.log('stream has ended');
        connListener.end();
      });

      fileStream.pipe(connListener);

    } else if (clientData[1] === '/image.jpeg') {
      var fileStream = fs.createReadStream('./public' + clientData[1]);
      fileStream.pipe(connListener);
      fileStream.on('end', function() {
        console.log('stream has ended');
        connListener.end();
      });
    } else if (clientData[1] === '/image.png') {
      var fileStream = fs.createReadStream('./public' + clientData[1]);
      fileStream.pipe(connListener);
      fileStream.on('end', function() {
        console.log('stream has ended');
        connListener.end();
      });
    } else if (clientData[1] === '/image.gif') {
      var fileStream = fs.createReadStream('./public' + clientData[1]);
      fileStream.pipe(connListener);
      fileStream.on('end', function() {
        console.log('stream has ended');
        connListener.end();
      });
    } else {
      connListener.write(responseContent);
      connListener.end();
    }
  } else {
    // echo back to client
    connListener.write(responseContent + pathData);
  }
}

exports.route = route;
