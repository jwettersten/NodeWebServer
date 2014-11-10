var net = require('net');
var fs = require('fs');
var testServer = require('../server.js');

var PORT = 8080;
var testHeaderOK = 'HTTP/1.1 200 OK' + '\r\n' + '\r\n';

describe('node TCPServer', function() {

  it('should return a TCPServer instance', function() {
    expect(testServer).not.toBe(undefined);
  });

  it('should return 200 header data', function() {

    var testClient = net.connect({port: PORT}, function() {
      console.log('testClient connected to server, not sending data.');
    });

    waits(1000);

    testClient.on('data', function(data) {
      expect(data.toString()).toBe('');
      testClient.end();
    });
  });

  it('should echo data sent', function() {
    var testMessage = 'Sending non http method string TCPServer';

    var testClient = net.connect({port: PORT}, function() {
      testClient.write(testMessage);
    });

    waits(1000);

    testClient.on('data', function(data) {
      expect(data.toString()).toBe(testHeaderOK + testMessage);
      testClient.end();
    });
  });

  it('sending GET / should return OK', function() {
    var testMessage = 'GET / HTTP/1.1';

    var testClient = net.connect({port: PORT}, function() {
      testClient.write(testMessage);
    });

    waits(1000);

    testClient.on('data', function(data) {
      expect(data.toString()).toBe(testHeaderOK);
      testClient.end();
    });
  });

});
