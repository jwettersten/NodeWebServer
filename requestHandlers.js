var fs = require('fs');
var exec=require("child_process").exec;
var constants = require('./constants');

var handlers = {
  '/' : listDirectory
};

function listDirectory(connListener) {
  console.log('request to list directory');
  exec("ls -lah", function (error, stdout, stderr) {
    writeStreamToClient(connListener, constants.NODEWEBSERVER.headers["responseHeaaderStatusLineOK"] + stdout);
  });
}

function loadFile(connListener, fileName) {
   connListener.write(constants.NODEWEBSERVER.headers["responseHeaaderStatusLineOK"]);
   var fileStream = fs.createReadStream(constants.NODEWEBSERVER.paths["fileDirectory"] + fileName);
   fileStream.pipe(connListener);

   fileStream.on('error', function(err) {
     console.log("Could not load requested file: " + err);
     writeStreamToClient(connListener, constants.NODEWEBSERVER.headers["responseHeaderStatusLine404"]);
   });
}

function echoRequest(connListener, requestData) {
  writeStreamToClient(connListener, constants.NODEWEBSERVER.headers["responseHeaaderStatusLineOK"] + requestData);
}

function writeStreamToClient(writableStream, data) {
  writableStream.write(data);
  writableStream.end();
}

exports.handlers = handlers;
exports.loadFile = loadFile;
exports.echoRequest = echoRequest;
