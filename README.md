[ ![Codeship Status for emartech/logmatic-io-tracker](https://app.codeship.com/projects/32f66b00-b34e-0134-bf3f-2a924262b5e8/status?branch=master)](https://app.codeship.com/projects/193456)

# logmatic-io-tracker
Sends tracking events to Logmatic.io. Good to measure events during page load.

## Installation
```
npm install @emartech/logmatic-io-tracker
```

## Initializing tracker
```
const logmatic = require('logmatic-js');
const logmaticIoTracker = require('@emartech/logmatic-io-tracker');

const logmaticTrackerOptions = {
  foo: 'bar'
};
const apiKey = 'your-logmatic-api-key';

logmaticIoTracker.init(logmatic, logmaticTrackerOptions, apiKey);
```

## Track an event
```
const logmaticIoTracker = require('@emartech/logmatic-io-tracker');
logmaticIoTracker.pingOnce('my-event');
```
