var net = require('net');
var testServer = require('../server.js');

describe('node TCPServer', function() {

  it('should return a TCPServer instance', function() {
    expect(testServer.TCPServer).not.toBe(null);
  });

  it('should return hey dude.', function() {
    var testClient = net.connect({port: 8080}, function() {});

    waits(1000);

    testClient.on('data', function(data) {
      expect(data.toString()).toBe('hey dude.');
      testClient.end();
    });
  });

});
