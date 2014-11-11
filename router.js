var requestHandlers = require('./requestHandlers');

function route(pathData, handlers, connListener) {

  var clientRequestData = pathData.toString().split(' ');

  if (clientRequestData[0] === 'GET') {
    if (typeof handlers[clientRequestData[1]] === 'function') {
      handlers[clientRequestData[1]](connListener);
    } else {
      requestHandlers.loadFile(connListener, clientRequestData[1]);
    }
  } else {
    requestHandlers.echoRequest(connListener, pathData);
  }
}

exports.route = route;
