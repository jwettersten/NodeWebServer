var fs = require('fs');
var util = require('util');

function route(pathData, connListener) {
  var responseHeaaderStatusLine = 'HTTP/1.1 200 OK' + '\r\n' + '\r\n';

  var clientData = pathData.toString().split(' ');

  // check data and route appriately
  if (clientData[0] === 'GET') {

    if (clientData[1] === '/file1') {
      connListener.write(responseHeaaderStatusLine);
      var fileStream = fs.createReadStream('./public' + clientData[1]);
      fileStream.pipe(connListener);

    } else if (clientData[1] === '/image.jpeg') {
      connListener.write(responseHeaaderStatusLine);
      var fileStream = fs.createReadStream('./public' + clientData[1]);
      fileStream.pipe(connListener);

    } else if (clientData[1] === '/image.png') {
      connListener.write(responseHeaaderStatusLine);
      var fileStream = fs.createReadStream('./public' + clientData[1]);
      fileStream.pipe(connListener);

    } else if (clientData[1] === '/image.gif') {
      connListener.write(responseHeaaderStatusLine);
      var fileStream = fs.createReadStream('./public' + clientData[1]);
      fileStream.pipe(connListener);

    } else {
      connListener.write(responseHeaaderStatusLine);
      connListener.end();
    }
  } else {
    // echo back to client
    connListener.write(responseHeaaderStatusLine + pathData);
  }
}

exports.route = route;
