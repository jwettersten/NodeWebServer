var requestHandlers = require('./requestHandlers');

function route(pathData, connListener) {

  var clientData = pathData.toString().split(' ');

  // check data and route appriately
  if (clientData[0] === 'GET') {
    if (typeof requestHandlers.handlers[clientData[1]] === 'function') {
      requestHandlers.handlers[clientData[1]](connListener);
    } else {
      requestHandlers.loadFile(connListener, clientData[1]);
    }
  } else {
    // echo back to client
    requestHandlers.echoRequest(connListener, pathData);
  }
}

exports.route = route;
