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


exports.serveAssets = function(response, pathname, callback) {
  var filePath = `${archive.paths.siteAssets}${pathname}`;
  fs.readFile(filePath, 'utf-8', function(err, data) {
    if (err) {
      filePath = `${archive.paths.archivedSites}/${pathname}`;
      fs.readFile(filePath, 'utf-8', function(err, data) {
        if (err) {
          console.log(filePath, pathname);
          callback ? callback() : responder(response, '404.. Does not exist', 404);
        } else {
          responder(response, data);
        }
      });
    } else {
      if (pathname === '/loading.html') { var statusCode = 302; }
      responder(response, data, statusCode);
    }
  });

};

var responder = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(data);
};

var collectData = exports.collectData = function(request, response, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk; 
  });
  request.on('end', function() { 
    data = data.split('=')[1];
    callback(data);
  });
};












