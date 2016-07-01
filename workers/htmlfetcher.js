var archive = require('../helpers/archive-helpers');
var _ = require('underscore');

// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.



//get array of urls in sites.txt and pass to function that does:
archive.getUrlArray(function(urlArray) {
  var array = [];
  var urlAryLength = urlArray.length;
  //for each file needed:
  _.forEach(urlArray, function(targetUrl, i) {
    archive.isUrlArchived(targetUrl, function() {

    });
  });
    //compare to the files in archives and perform some function on needed files that does:



      //go grab copies of those arrays and save to archives in own files
});
