var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var fs = require('fs');
var serveHelp = require('../web/http-helpers');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify 
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!


//called from both SERVER and WORKER
exports.readListOfUrls = function(response, pathName, reqUrl) {
  //get sites.txt
  var fileName = exports.paths.list;

  fs.readFile(fileName, 'utf-8', function(err, data) {
    console.log('this happens first');
    var urlArray = data.split(',');

    console.log(urlArray);
    if (exports.isUrlInList(reqUrl, urlArray)) {
      serveHelp.archiveServe(response, pathName);
      return;
    } else {
      //if doesn't exist.
      exports.addUrlToList(reqUrl);
    }
  });
  //convert entries into an array of Urls


  //return array of Urls
};


//called from SERVER only
//inputs: new Url(reqUrl) & readListOfUrl(urlArray)
exports.isUrlInList = function(reqUrl, urlArray) {
  return _.contains(urlArray, reqUrl);
};


//called from SERVER only
//inputs: new Url(reqUrl)
exports.addUrlToList = function(reqUrl) {
  //add Url to sites.txt
  var fileName = exports.paths.list;

  fs.appendFile(fileName, `${reqUrl},`, function() {
    console.log('asdf');
  });

};


//called from both SERVER and WORKER
exports.isUrlArchived = function(searchUrl) {
  //search sites directory for a file with name match.

  //return Boolean ?? - Maybe return actual file.
};


//called from WORKER only
//input: array of all Urls
exports.downloadUrls = function(urlArray) {
  //create array of non-archived Urls using _.reject(isUrlArchived) logic

};
