var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
exports.readListOfUrls = function() {
  //get sites.txt
  //convert entries into an array of Urls

  //return array of Urls
};


//called from SERVER only
//inputs: new Url(reqUrl) & readListOfUrl(urlArray)
exports.isUrlInList = function(reqUrl, urlArray) {
  //check if 

  //return Boolean
};


//called from SERVER only
//inputs: new Url(reqUrl)
exports.addUrlToList = function(reqUrl) {
  //add Url to sites.txt

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
