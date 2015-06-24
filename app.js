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
var cookieParser = require('cookie-parser');
var resource = require('express-resource');

var assert = require('assert');

db.connect(config.mongoUrl);

app.use('/', logger('combined', {immediate: true}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
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
var FacebookStrategy = require('passport-facebook').Strategy;

app.use(passport.initialize());
app.use(passport.session());


// passport config
var User = require('./models/account');

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUserSocialSupport());
passport.deserializeUser(User.deserializeUserSocialSupport());

passport.use(new GoogleStrategy(config.GoogleStrategy,User.socialAuthenticate('google')));

passport.use(new FacebookStrategy(config.FacebookStrategy,User.socialAuthenticate('facebook')));

var routes = require('./routes/index');
app.use('/', routes);

// var usersHandler = require('./routes/users_res')(db);
// app.resource('users', usersHandler);

module.exports = app;

if (!module.parent) {
    app.listen(config.port);
    console.log('(%s) app listening on port %s', app.get('env'), config.port);
}
