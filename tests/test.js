var loggr = require('./index.js'),
    moment = require('moment'),
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');

const should = chai.should();
chai.use(sinonChai);

var deps,
    sandbox,
    timestamp;

beforeEach(function(){
  sandbox = sinon.collection;
  timestamp = '2017-05-05T00:05:00Z';
  stubDeps();
})

afterEach(function(){
  sandbox.restore();
})

function stubDeps(){
  deps = {
    moment: {},
    console: {}
  }

  deps.moment.utc = sandbox
    .stub(moment, 'utc')
    .callsFake(function(date){
      return {
        toISOString: function(){
          return timestamp;
        }
      }
    })

  deps.console.log = sandbox
    .spy(console, 'log');
}

describe('info', function(){
  it('correctly formats an info message', function(){
    const message = 'test message';
    loggr.info(message);
    deps.console.log.should.have.been.calledWith(timestamp+' [info] '+message);
  })
})

describe('warning', function(){
  it('correctly formats an warning message', function(){
    const message = 'test message';
    loggr.warn(message);
    deps.console.log.should.have.been.calledWith(timestamp+' [warning] '+message);
  })
})

describe('error', function(){
  it('correctly formats an error message', function(){
    const message = 'test message';
    loggr.err(message);
    deps.console.log.should.have.been.calledWith(timestamp+' [error] '+message);
  })
})
