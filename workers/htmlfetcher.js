var archive = require('../helpers/archive-helpers');
var CronJob = require('cron').CronJob;
var _ = require('underscore');

new CronJob('20 * * * * *', function() {
  console.log('consore.rogged');
  archive.readListOfUrls(archive.downloadUrls);
}, null, true, 'America/Los_Angeles');