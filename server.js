"use strict";

var express = require('express');
var app = express();
var db = require('./lib/db');
var config = require('./config/config.json')[app.get('env')];

var methodOverride = require('method-override');
var bodyParser = require('body-parser');

var User = require('./models/user');
var Note = {};
// var routes = require('./routes');

db.connect(config.mongoUrl);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(function(req, res, next) {
  req.User = User;
  req.Note = Note;
  next();
});

app.get('/users', function(req, res) {
  req.
  res.status(200);
  res.send('campuchia');
});


module.exports = app;

if (!module.parent) {
  app.listen(config.port);
  console.log('(%s) app listening on port %s', app.get('env'), config.port);
}
