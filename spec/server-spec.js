var testServer = require('../server.js');

describe('node socketServer', function() {

  it('should return a socketServer instance', function() {
    expect(testServer.server).not.toBe(null);
  });

  it('should return Hey dude', function() {
    expect(testServer.server).toBe('Hey dude');
  });

});
