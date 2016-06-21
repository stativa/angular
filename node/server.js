var http = require("http");
var url = require("url");
var fallback = require('express-history-api-fallback');
var express = require('express');
var request = require('request');

var app = express();

var root = "./";
app.use(express.static(root));
app.use(fallback('index.html', { root: root }));

var mysql = require('mysql');

var connection = mysql.createConnection({
  
});

connection.connect();


function start() {
  /*app.get("/api/hello", function(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  });*/


  app.get('/api/items/:id', function (req, res) {
    connection.query('SET NAMES utf8');
    connection.query('Select * from items where id = ' + req.params.id, function(err, rows, fields) {
      if (err) throw err;
      res.json(rows);
    });
  });


  
  

  http.createServer(app).listen(3000);
  console.log("Server has started.");
}

exports.start = start;



/*

var url = require("url");
var express = require('express');
var http = require('http');
//var config = require('config');
//var log = require('libs/log')(module);
var app = express();
var mysql = require('mysql');


function start() {
  //app.set('port', config.get('port'));
  app.set('port', 3000);
  http.createServer(app).listen(3000, function(){
    //http.createServer(app).listen(app.get('port'), function(){
    //log.info('Express is listening on port 3000');
  });

  var connection = mysql.createConnection({
    host:'193.169.189.215',
    port: '3306',
    user:'halatikc_two',
    password:'rtyujh_7N%',
    database:'halatikc_halatik'
  });

  connection.connect();

  app.get("/api/hello", function(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  });


}*/

exports.start = start;

