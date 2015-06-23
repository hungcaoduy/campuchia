"use strict";
console.log('App process id (pid): %s', process.pid);

var express = require('express');
var app = express();
var db = require('./lib/db');
var config = require('./config/config.json')[app.get('env')];

var methodOverride = require('method-override');
var bodyParser = require('body-parser');

var path = require('path');
var logger = require('morgan');

var resource = require('express-resource');


db.connect(config.mongoUrl);

app.use('/', logger('combined', {immediate: true}));

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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

//Authenticate
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

app.use(passport.initialize());
app.use(passport.session());


// passport config
var LocalUser = require('./models/user'),
    GoogleUser = require('./models/googleuser');

passport.use(new LocalStrategy(LocalUser.authenticate()));
// passport.serializeUser(LocalUser.serializeUser());
// passport.deserializeUser(LocalUser.deserializeUser());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    GoogleUser.findById(id,function(err,user){
        if (err) done(err);
        if (user) {
            done(null,user);
        } else {
            LocalUser.findById(id, function(err,user){
                if(err) done(err);
                done(null,user);
            });
        }
    });
});


passport.use(new GoogleStrategy(config.GoogleStrategy,
function(accessToken, refreshToken, profile, done) {
  GoogleUser.findOne({googleID: profile.id}, function(err, oldUser) {
    if (oldUser) {
      done(null, oldUser);
    } else {
      var newUser = new GoogleUser({
        googleID: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName
      }).save(function(err, newUser) {
        if (err) throw err;
        done(null, newUser);
      });
    }
  });
}
));

var routes = require('./routes/index');
app.use('/', routes);

app.get('/users', function(req, res) {
  req.
  res.status(200);
  // res.send('campuchia');
  res.json({"001":{"name": "Duy Hung Cao", "email": "hungcdqt@gmail.com"},
    "002":{"name": "Ronaldo Nguyen", "email": "ronaldo@gmail.com"}});
});

// var usersHandler = require('./routes/users_res')(db);
// app.resource('users', usersHandler);

module.exports = app;

if (!module.parent) {
  app.listen(config.port);
  console.log('(%s) app listening on port %s', app.get('env'), config.port);
}
