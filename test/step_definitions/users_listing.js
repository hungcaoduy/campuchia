'use strict';

var chai = require('chai'),
    expect = chai.expect,
    sugar = require('../support/cucumber_sugar');

var request = require('request');
var Q = require('q');

chai.use(require("sinon-chai"));
chai.use(require("chai-as-promised"));

var getAllUsers = function() {
    var deferred = Q.defer();
    request('http://localhost:4711/users', function(error, res, body) {
        console.log(body);
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(JSON.parse(body));
        }        
    });
    return deferred.promise;
};

module.exports = function () {
        var Given = this.Given,
            When = this.When,
            Then = this.Then;

        this.World = require("../support/world.js");

        When(/^search term is empty$/, function (callback) {
            this.searchTerm = "";
            callback();
        });

        Then(/^all users will be listed$/, sugar(function (callback) {
            var users = getAllUsers();
            var checkIfUsersListIsCorrect = function(users) {
                return expect(users).eventually.to.have.any.keys('user11', 'user22');
            };
            return checkIfUsersListIsCorrect(users);
        }));

        When(/^user search by "([^"]*)"$/, function (term, callback) {
            callback();
        });

        Then(/^matched "([^"]*)" will be listed$/, function (users, callback) {
            // expect(false).to.be.true;
            callback();
        });


};