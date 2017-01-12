'use strict';

const path = require('path');

describe('logmatic.io tracker', function() {

  afterEach(function() {
    delete require.cache[path.join(__dirname, 'index.js')];
  });

  describe('#init', function() {

    it('should initialize logmatic', function() {
      const logmaticIoTracker = require('./');
      const logmatic = { init: () => {} };
      this.sandbox.spy(logmatic, 'init');

      logmaticIoTracker.init(logmatic, {}, 'token');

      this.expect(logmatic.init).to.have.been.calledWith('token');
    });

  });

  describe('#pingOnce', function() {

    it('should not ping logmatic if not initialized', function() {
      const logmaticIoTracker = require('./');
      let logmaticMessage = {};
      const logmatic = {
        init: () => {},
        log: (message) => {
          logmaticMessage = message;
        }
      };
      this.sandbox.spy(logmatic, 'log');

      logmaticIoTracker.pingOnce('beacon-name');

      this.expect(logmatic, 'log').to.have.been.notCalled;
    });


    it('should ping logmatic with proper message', function() {
      const logmaticIoTracker = require('./');
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
      const logmaticIoTracker = require('./');
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
