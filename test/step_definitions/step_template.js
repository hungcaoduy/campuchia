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



};