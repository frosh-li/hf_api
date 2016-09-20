

var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' }
  ]
});

var logger = log4js.getLogger('hfbank');

module.exports = logger;