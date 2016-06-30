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

var paths = exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
  // loader: path.join(__dirname, '../web/public/loading.html')
};

// Used for stubbing paths for tests, do not modify 
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!


//called from both SERVER and WORKER
var readListOfUrls = exports.readListOfUrls = function(response, pathName, reqUrl) {
  //get sites.txt
  var fileName = paths.list;

  fs.readFile(fileName, 'utf-8', function(err, data) {

    var urlArray = data.split(',');

    if (isUrlInList(reqUrl, urlArray)) {
      serveHelp.archiveServe(response, pathName);
    } else {
      //if doesn't exist.
      addUrlToList(response, reqUrl);
    }
  });
};


//called from SERVER only
//inputs: new Url(reqUrl) & readListOfUrl(urlArray)
var isUrlInList = exports.isUrlInList = function(reqUrl, urlArray) {
  return _.contains(urlArray, reqUrl);
};


//called from SERVER only
//inputs: new Url(reqUrl)
var addUrlToList = exports.addUrlToList = function(response, reqUrl) {
  //add Url to sites.txt
  var fileName = paths.list;

  fs.appendFile(fileName, `${reqUrl},`, function() {
    serveHelp.publicServe(response, '/loading.html');
  });

};


//called from both WORKER
exports.isUrlArchived = function(searchUrl) {
  //search sites directory for a file with name match.

  //return Boolean ?? - Maybe return actual file.
};


//called from WORKER only
//input: array of all Urls
exports.downloadUrls = function(urlArray) {
  //create array of non-archived Urls using _.reject(isUrlArchived) logic

};
