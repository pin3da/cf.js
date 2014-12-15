#! /usr/bin/env node


process.title = 'cf.js';

var cfjs = require('../app.js');
cfjs.start(function (err) {
  if (!err) {
    jitsu.log.info('Cf.js'.grey + ' ok'.green.bold);
  }
  process.exit(err ? 1 : 0);
});
