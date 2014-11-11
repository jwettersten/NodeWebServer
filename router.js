var requestHandlers = require('./requestHandlers');

function route(pathData, connListener) {

  var clientRequestData = pathData.toString().split(' ');

  if (clientRequestData[0] === 'GET') {
    if (typeof requestHandlers.handlers[clientRequestData[1]] === 'function') {
      requestHandlers.handlers[clientRequestData[1]](connListener);
    } else {
      requestHandlers.loadFile(connListener, clientRequestData[1]);
    }
  } else {
    requestHandlers.echoRequest(connListener, pathData);
  }
}

exports.route = route;
