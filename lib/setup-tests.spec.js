'use strict';

const chai = require('chai');
const chaiSubset = require('chai-subset');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

before(function() {
  chai.use(sinonChai);
  chai.use(chaiSubset);

  this.expect = chai.expect;

  global.window = {
    performance: {
      timing: {
        navigationStart: 0
      }
    }
  };
});

beforeEach(function() {
  this.sandbox = sinon.sandbox.create();
});

afterEach(function() {
  this.sandbox.restore();
});
