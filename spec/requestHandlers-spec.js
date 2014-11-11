var testRequestHandlers = require('../requestHandlers');

describe('node TCPServer requestHandler', function() {

  it('should return function', function() {
    expect(typeof testRequestHandlers.handlers['/']).toEqual('function');
  });

});
