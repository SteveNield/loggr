var moment = require('moment');

function info(message){
  log('info', message);
}

function err(message){
  log('error', message);
}

function warn(message){
  log('warning', message);
}

function log(level, message){
    console.log(moment.utc(new Date()).toISOString() + ' [' + level + '] ' + message);
}

module.exports.info = info;
module.exports.warn = warn;
module.exports.err = err;
