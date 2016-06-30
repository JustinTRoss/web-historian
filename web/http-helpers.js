var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers'); 
var url = require('url');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};


/*exports.serveAssets = function(response, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  var temp = callback(response, asset);



    //change headers.headers['Content-Type'] to equal request.
    //headers.headers['Content-Type'] = request.headers.accept.split(',')[0];

};*/

// As you progress, keep thinking about what helper functions you can put here!

var publicServe = exports.publicServe = function(response, asset) {
  var returnFile = `${archive.paths.siteAssets}${asset}`;
  fs.readFile(returnFile, 'utf-8', function(err, data) {
    if (err) {
      data = 'Site file not found';
      var statusCode = 404;
    } else {
      if (asset === '/loading.html') {
        var statusCode = 302;
      }
    }
    responder(response, data, statusCode);
  });

};

exports.archiveServe = function(response, asset) {
  var returnFile = `${archive.paths.archivedSites}${asset}`;
  fs.readFile(returnFile, 'utf-8', function(err, data) {
    if (err) {

      publicServe(response, '/loading.html');
    } else {
      //If it exists in archives return outright(responder)
      responder(response, data);
    }
  });
};

var responder = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(data);
};