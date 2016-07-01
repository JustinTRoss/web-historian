var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var serveHelp = require('./http-helpers');
// require more modules/folders here!

var actions = {
  GET: function(request, response) {
    var pathname = url.parse(request.url).pathname;
    pathname = pathname === '/' ? '/index.html' : pathname;
    serveHelp.serveAssets(response, pathname/*, callback*/);
  },
  POST: function(request, response) { 
    //collect request data
    serveHelp.collectData(request, response, function(searchUrl) {

      //check if searchUrl is in our sites.txt file
      archive.isUrlInList(searchUrl, function(found) {
        if (found) {
          archive.isUrlArchived(searchUrl, function(isArchived) {
            if (isArchived) {
              serveHelp.serveAssets(response, searchUrl);
            } else {
              serveHelp.serveAssets(response, '/loading.html');
            }
          });
        } else { // not found in Url list (sites.txt)
          archive.addUrlToList(searchUrl, function() {
            serveHelp.serveAssets(response, '/loading.html');
          });
        }
      });
    });
  }, 
  OPTIONS: function(request, response) {
    //something else
  }
};

exports.handleRequest = function (request, response) {

  if (actions[request.method]) {
    actions[request.method](request, response);
  } else {
    response.end('404 NAT Fownd');
  } 
  //response.end(archive.paths.list); 
};
