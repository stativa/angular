var http = require("http");
var url = require("url");
var fallback = require('express-history-api-fallback');
var express = require('express');
var app = express();

var root = "./";
app.use(express.static(root));
app.use(fallback('index.html', { root: root }));

function start() { 
  app.get("/api/hello", function(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  });

  http.createServer(app).listen(3000);
  console.log("Server has started.");

  
}

exports.start = start;