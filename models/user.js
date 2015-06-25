'use strict';

var passportLocalMongoose = require('passport-local-mongoose');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = new Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    displayname: String,
    gender: String,
    socialtype: String,
    socialid: String
});

var myPlugin = function(schema, options) {
    schema.statics.socialAuthenticate = function(socialtype) {
        //can we handle all socialtype the same way?
        //this is now comply to google auth 2.0
        var self = this;
        //https://developers.google.com/+/web/api/rest/latest/people
        return function(accessToken, refreshToken, profile, done) {
            console.log('profile:', profile);
            self.findOne({socialid: profile.id}, function(err, oldUser) {
                if (oldUser) {
                    done(null, oldUser);
                } else {
                    var newUser = new self({
                        socialtype: profile.provider,
                        socialid: profile.id,
                        gender: profile.gender,
                        username: profile.emails[0].value,
                        displayname: profile.displayName,
                        firstname: profile.name.givenName,
                        lastname: profile.name.familyName
                    }).save(function(err, newUser) {
                        if (err) throw err;
                        done(null, newUser);
                    });
                }
            });
        };
    };
    schema.statics.serializeUserSocialSupport = function() {
        var self = this;
        return function(user, done) {
            done(null, user.id);
        };
    };
    schema.statics.deserializeUserSocialSupport = function() {
        var self = this;
        return function(id, done) {
            self.findById(id, function(err,user){
                if(err) done(err);
                done(null,user);
            });
        };
    };
}

User.plugin(myPlugin);
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
