var testRequestHandlers = require('../requestHandlers');

describe('node TCPServer requestHandler', function() {

  it('should return list function', function() {
    expect(typeof testRequestHandlers.handlers['/']).toEqual('function');
  });

});
