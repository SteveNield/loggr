var loggr = require('./../index.js');
loggr.setupAppInsights('43f75f72-99bd-4c6c-8a6b-b148aa1c8d85');

loggr.info('hey there');

loggr.warn('warning!');

loggr.err('something gone wrong!');

loggr.event('something interesting happened', {
  interestingLevel: 9000,
  peopleWhoCared: []
});
