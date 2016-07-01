var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var serveHelp = require('../web/http-helpers');
var request = require('request');

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

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Server stuff~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//called from SERVER
var readListOfUrls = exports.readListOfUrls = function(callback) {
  //get sites.txt
  var fileName = paths.list;

  fs.readFile(fileName, 'utf-8', function(err, data) {
    var urlArray = data.split('\n');
    if (callback) {
      callback(urlArray);     
    }
  });
};


//called from SERVER only
//inputs: new Url(reqUrl) & readListOfUrl(urlArray)
var isUrlInList = exports.isUrlInList = function(reqUrl, callback) {
  readListOfUrls(function(urlArray) {
    var found = _.contains(urlArray, reqUrl);
    callback(found);
  });
};


//called from SERVER only
//inputs: new Url(reqUrl)
var addUrlToList = exports.addUrlToList = function(reqUrl, callback) {
  //add Url to sites.txt
  var fileName = paths.list;

  fs.appendFile(fileName, `${reqUrl}\n`, function() {
    callback();
  });
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Worker stuff~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//called from both WORKER
exports.isUrlArchived = function(searchUrl, callback) {
  //Changed the fileName 
  //var fileName = path.join(exports.paths.archivedSites, searchUrl);
  var fileName = paths.archivedSites + '/' + searchUrl;

  fs.exists(fileName, function(exists) {
    callback(exists);
  });

};


//called from WORKER only
//input: array of all Urls
exports.downloadUrls = function(urlArray) {
  //create array of non-archived Urls using _.reject(isUrlArchived) logic
  _.each(urlArray, function(url) {
    if (!url) {
      return;
    }
    request(`http://${url}`).pipe(fs.createWriteStream(`${paths.archivedSites}/${url}`));
  });
};
