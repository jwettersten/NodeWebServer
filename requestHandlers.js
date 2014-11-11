var fs = require('fs');
var exec=require("child_process").exec;
var constants = require('./constants');

function listDirectory(connListener) {
  console.log('request to list directory');
  exec("ls ./public -lah", function (error, stdout, stderr) {
    writeStreamToClient(connListener, constants.HEADERS["OK"] + stdout);
  });
}

function loadFile(connListener, fileName) {
   var fileStream = fs.createReadStream(constants.PATHS["fileDirectory"] + fileName);

   fileStream.on('open', function() {
     connListener.write(constants.HEADERS["OK"]);
     fileStream.pipe(connListener);
   });

   fileStream.on('error', function(err) {
     console.log("Could not load requested file: " + err);
     writeStreamToClient(connListener, constants.HEADERS["404"]);
   });
}

function echoRequest(connListener, requestData) {
  writeStreamToClient(connListener, constants.HEADERS["OK"] + requestData);
}

function writeStreamToClient(writableStream, data) {
  writableStream.write(data);
  writableStream.end();
}

exports.listDirectory = listDirectory;
exports.loadFile = loadFile;
exports.echoRequest = echoRequest;
