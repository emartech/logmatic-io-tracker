'use strict';

const logmaticIoTracker = require('./');

describe('logmatic.io tracker', function() {

  describe('#init', function() {

    it('should initialize logmatic', function() {
      const logmatic = { init: () => {} };
      this.sandbox.spy(logmatic, 'init');

      logmaticIoTracker.init(logmatic, {}, 'token');

      this.expect(logmatic.init).to.have.been.calledWith('token');
    });

  });

  describe('#pingOnce', function() {

    it('should ping logmatic with proper message', function() {
      let logmaticMessage = {};
      const logmatic = {
        init: () => {},
        log: (message) => {
          logmaticMessage = message;
        }
      };
      this.sandbox.spy(logmatic, 'log');

      logmaticIoTracker.init(logmatic, { foo: 'bar' });
      logmaticIoTracker.pingOnce('beacon-name');

      this.expect(logmaticMessage).to.containSubset({
        foo: 'bar',
        beacon: 'beacon-name'
      });
      this.expect(Object.keys(logmaticMessage)).to.contain('elapsed');
    });


    it('should ping logmatic only once', function() {
      const logmatic = {
        init: () => {},
        log: () => {}
      };
      this.sandbox.spy(logmatic, 'log');

      logmaticIoTracker.init(logmatic);
      logmaticIoTracker.pingOnce('beacon-name');
      logmaticIoTracker.pingOnce('beacon-name');

      this.expect(logmatic.log).to.have.been.calledOnce;
    });

  });

});
