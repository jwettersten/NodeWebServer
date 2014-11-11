var PORT = 8080;

var HEADERS = {
  "OK": "HTTP/1.1 200 OK \r\n\r\n",
  "404": "HTTP/1.1 404 Not Found \r\n\r\n"
};

var PATHS = {
  "fileDirectory": "./public"
};

exports.PORT = PORT;
exports.HEADERS = HEADERS;
exports.PATHS = PATHS;
