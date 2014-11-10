var fs = require('fs');
var requestHandlers = require('./requestHandlers');

function route(pathData, connListener) {
  var responseHeaaderStatusLine = 'HTTP/1.1 200 OK' + '\r\n' + '\r\n';

  var clientData = pathData.toString().split(' ');

  // check data and route appriately
  if (clientData[0] === 'GET') {
    if (typeof requestHandlers.handlers[clientData[1]] === 'function') {
      requestHandlers.handlers[clientData[1]](connListener);
    } else {
      connListener.write(responseHeaaderStatusLine);
      var fileStream = fs.createReadStream('./public' + clientData[1]);
      fileStream.pipe(connListener);
    }
  } else {
    // echo back to client
    connListener.write(responseHeaaderStatusLine + pathData);
  }
}

exports.route = route;
