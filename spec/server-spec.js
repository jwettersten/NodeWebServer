var net = require('net');
var constants = require('../constants');
var testServer = require('../server.js');

describe('node TCPServer', function() {

  it('should return a TCPServer instance', function() {
    expect(testServer).not.toBe(undefined);
  });

  it('should return 200 header data', function() {

    var testClient = net.connect({port: constants.PORT}, function() {
      console.log('testClient connected to server, not sending data.');
    });
    // lookup flag signal or semaphore or event flag
    waits(1000);

    testClient.on('data', function(data) {
      expect(data.toString()).toBe('');
      testClient.end();
    });
  });

  it('should echo data sent', function() {
    var testMessage = 'Sending non http method string TCPServer';

    var testClient = net.connect({port: constants.PORT}, function() {
      testClient.write(testMessage);
    });

    waits(1000);

    testClient.on('data', function(data) {
      expect(data.toString()).toBe(constants.HEADERS["OK"] + testMessage);
      testClient.end();
    });
  });

});
