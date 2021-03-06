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

	Given(/^that the system already exist following groups:$/, function (existingGroups, callback) {
	  this.withExistingGroups(existingGroups);
	  callback.pending();
	});

	Given(/^that user already logged in$/, function (callback) {
		this.login();
		expect(this.isLoggedIn).to.be.true;
		callback.pending();
	});

	When(/^user enter an existing group name$/, function (callback) {
	  // Write code here that turns the phrase above into concrete actions
	  callback.pending();
	});

	Then(/^the error message shown$/, function (callback) {
	  // Write code here that turns the phrase above into concrete actions
	  callback.pending();
	});

	Then(/^the groups list does not changed$/, function (callback) {
	  // Write code here that turns the phrase above into concrete actions
	  callback.pending();
	});

}