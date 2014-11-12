function route(pathData, handlers, connListener) {

  var clientRequestData = pathData.toString().split(' ');

  if (clientRequestData[0] === 'GET') {
    if (typeof handlers[clientRequestData[1]] === 'function') {
      handlers[clientRequestData[1]](connListener);
    } else {
      handlers['default'](connListener, clientRequestData[1]);
    }
  } else {
    handlers['echo'](connListener, pathData);
  }
}

exports.route = route;
