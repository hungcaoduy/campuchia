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

    When(/^search term is empty$/, function (callback) {
      callback.pending();
    });

    Then(/^all users will be listed$/, function (callback) {
      callback.pending();
    });

    When(/^user search by "([^"]*)"$/, function (term, callback) {
      console.log('searched term: ', term);
      expect(true).to.be.true;
      callback();
    });

    Then(/^matched "([^"]*)" will be listed$/, function (users, callback) {
      // expect(false).to.be.true;
      callback();
    });


};