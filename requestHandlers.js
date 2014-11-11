var fs = require('fs');
var exec=require("child_process").exec;

var responseHeaaderStatusLineOK = 'HTTP/1.1 200 OK' + '\r\n' + '\r\n';
var responseHeaderStatusLine404 = 'HTTP/1.1 404 Not Found' + '\r\n' + '\r\n';
var fileDirectory = './public';

var handlers = {
  '/' : listDirectory
};

function listDirectory(connListener) {
  console.log('request to list directory');
  exec("ls -lah", function (error, stdout, stderr) {
    writeStreamToClient(connListener, responseHeaaderStatusLineOK + stdout);
  });
}

function loadFile(connListener, fileName) {
   connListener.write(responseHeaaderStatusLineOK);
   var fileStream = fs.createReadStream(fileDirectory + fileName);
   fileStream.pipe(connListener);

   fileStream.on('error', function(err) {
     console.log("Could not load requested file: " + err);
     writeStreamToClient(connListener, responseHeaderStatusLine404);
   });
}

function echoRequest(connListener, requestData) {
  writeStreamToClient(connListener, responseHeaaderStatusLineOK + requestData);
}

function writeStreamToClient(writableStream, data) {
  writableStream.write(data);
  writableStream.end();
}

exports.handlers = handlers;
exports.loadFile = loadFile;
exports.echoRequest = echoRequest;
