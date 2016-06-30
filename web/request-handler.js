var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var headers = require('./http-helpers');
// require more modules/folders here!

var actions = {
  GET: function(request, response /*?*/) {
    //do something.. um.. eventually..
    console.log('__dirname, request.url, url.parse(request.url).pathname');
    var pathname = url.parse(request.url).pathname;

    if ( pathname === '/') {
      pathname = '/index.html';
    }

    var returnFile = `${__dirname}/public${pathname}`;

    fs.readFile(returnFile, 'utf-8', function(err, data) {
      if (err) {
        response.end('404 NAT FOWND');
        return;
      }
      console.log(request.headers.accept.split(',')[0]);
      //change headers.headers['Content-Type'] to equal request.
      headers.headers['Content-Type'] = request.headers.accept.split(',')[0];
      response.writeHead(200, headers.headers);
      response.end(data);
      
    });
  },
  POST: function(request, response) {
    //and that will do something as well down the line..
  },
  OPTIONS: function(request, response) {
    //something else
  }
};

exports.handleRequest = function (request, response) {
  //
  if (actions[request.method]) {
    actions[request.method](request, response);
  } else {
    response.end('404 NAT Fownd');
  }
  //response.end(archive.paths.list);
};
