var NODEWEBSERVER = {};

NODEWEBSERVER.headers = {
  "responseHeaaderStatusLineOK": "HTTP/1.1 200 OK \r\n\r\n",
  "responseHeaderStatusLine404": "HTTP/1.1 404 Not Found \r\n\r\n"
};

NODEWEBSERVER.paths = {
  "fileDirectory": "./public"
};

exports.NODEWEBSERVER = NODEWEBSERVER;
