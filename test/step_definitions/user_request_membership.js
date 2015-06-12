'use strict';

var chai = require('chai'),
                expect = chai.expect,
                sugar = require('../support/cucumber_sugar');

chai.use(require("sinon-chai"));
chai.use(require("chai-as-promised"));

module.exports = function () {
    var Given = this.Given,
            When = this.When,
            Then = this.Then;

    this.World = require("../support/world.js");

    Given(/^that user is already authenticated$/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      callback.pending();
    });

    When(/^the user view a group$/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      callback.pending();
    });

    Then(/^he can send request for membership$/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      callback.pending();
    });

    Given(/^he is the owner of the "([^"]*)"$/, function (theGroup, callback) {
      // Write code here that turns the phrase above into concrete actions
      callback.pending();
    });

    When(/^he view the "([^"]*)"$/, function (theGroup, callback) {
      // Write code here that turns the phrase above into concrete actions
      callback.pending();
    });

    Given(/^no pending requests$/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      callback.pending();
    });

    Then(/^he should not see any requests$/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      callback.pending();
    });

    Then(/^no action available for pending request$/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      callback.pending();
    });

    Given(/^pending requests$/, function (table, callback) {
      // Write code here that turns the phrase above into concrete actions
      callback.pending();
    });

    Then(/^he should view the requests$/, function (table, callback) {
      // Write code here that turns the phrase above into concrete actions
      callback.pending();
    });

    Then(/^he accept each requests$/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      callback.pending();
    });


};