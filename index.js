var moment = require('moment');

module.exports.info = function(message){
  log('info', message);
}

module.exports.err = function(message){
  log('error', message);
}

module.exports.warn = function(message){
  log('warning', message);
}

function log(level, message){
    console.log(moment.utc(new Date()).toISOString() + ' [' + level + '] ' + message);
}
