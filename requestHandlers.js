var fs = require('fs');
var util = require('util');

var handlers = {
  '/' : listDir
};

function listDir() {
  console.log('request to list directory');
}

exports.handlers = handlers;
exports.listDir = listDir;
