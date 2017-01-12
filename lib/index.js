'use strict';

class LogmaticIoTracker {

  init(logmatic, options = {}, token = '') {
    this._logmatic = logmatic;
    this._options = options;

    this._logmatic.init(token);
    this._history = [];

    this._isInitialized = true;
  }


  pingOnce(beacon) {
    if (this._isInitialized === true && !this._hasAlreadyPinged(beacon)) {
      this._logmatic.log(this._generateMessage(beacon));
      this._history = this._history.concat([beacon]);
    }
  }


  get _startTime() {
    return window.performance.timing.navigationStart;
  }


  get _currentTime() {
    return new Date().getTime();
  }


  get _elapsedTime() {
    return this._currentTime - this._startTime;
  }


  _generateMessage(beacon) {
    return Object.assign(this._options, {}, {
      beacon,
      elapsed: this._elapsedTime
    });
  }


  _hasAlreadyPinged(beacon) {
    return this._history.indexOf(beacon) >= 0;
  }


  static create() {
    return new LogmaticIoTracker();
  }

};

module.exports = LogmaticIoTracker.create();
