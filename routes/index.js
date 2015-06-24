var express = require('express');
var passport = require('passport');
var User = require('../models/account');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            console.log('register err: ', err);
            return res.render('register', {info: 'Sorry. That username already exists. Try again.' + err});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    // console.log('login successfully!, user: ', req.user);
    res.render('profile', {user : req.user});
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

//Authenticate
router.get('/auth/google', passport.authenticate('google',{ scope : 'email'}));
router.get('/auth/google/callback', 
    passport.authenticate('google',{ failureRedirect: '/login'}),
    function(req,res){
        res.render('profile', {user : req.user});
    }
);

router.get('/auth/facebook', passport.authenticate('facebook',{ scope : 'email'}));
router.get('/auth/facebook/callback', 
    passport.authenticate('facebook',{ failureRedirect: '/login'}),
    function(req,res){
        res.render('profile', {user : req.user});
    }
);


module.exports = router;