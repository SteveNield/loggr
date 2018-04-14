var moment = require('moment'),
    appinsights = require('applicationinsights');

function info(message){
  log('info', message);
}

function err(message){
  appInsightsError(message);
  log('error', message);
}

function warn(message){
  log('warning', message);
}

function appInsightsError(err){
  if(appinsights.defaultClient){
    appinsights.defaultClient.trackException({
      exception: new Error(err)
    })
  }
}

function event(eventName, props){
  info(eventName);
  if(appinsights.defaultClient){
    info('Event '+eventName+' raised');
    appinsights.defaultClient.trackEvent({
      name: eventName,
      properties: props
    });
  } else {
    warn('event raised but appinsights is not configured');
  }
}

function log(level, message){
    console.log(moment.utc(new Date()).toISOString() + ' [' + level + '] ' + message);
}

function trackRequest(req,res){
  if(appinsights.defaultClient){
    appinsights.defaultClient.trackNodeHttpRequest({
      request: req,
      response: res
    });
  }
}

module.exports.appInsightsRequestTracking = function(req,res,next){
  trackRequest(req,res);
  next();
}

module.exports.setupAppInsights = function(instrumentationKey){
  appinsights.setup(instrumentationKey).start();
}

module.exports.info = info;
module.exports.warn = warn;
module.exports.err = err;
module.exports.event = event;
module.exports.trackRequest = trackRequest;
