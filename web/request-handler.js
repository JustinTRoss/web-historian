var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var serveHelp = require('./http-helpers');
// require more modules/folders here!

var actions = {
  GET: function(request, response /*?*/) {
    var pathname = url.parse(request.url).pathname;

    if ( pathname === '/' ) {
      pathname = '/index.html';
    }

    if ( pathname === '/index.html' || pathname === '/styles.css') {
      //Public case aka site files (index.html/styles.css)
      serveHelp.publicServe(response, pathname);
    } else {
      //Archive Case aka archives/sites and archives/sites.txt
      serveHelp.archiveServe(response, pathname);
    }
    
  },
  POST: function(request, response) {
    //and that will do something as well down the line..
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
