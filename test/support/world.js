'use strict';

module.exports = function (cb) {
	var world = {},
		temp = {};

	var existingGroups = [];

	world.isLoggedIn = false;

	world.withExistingGroups = function(groups) {
		existingGroups = groups.hashes().slice();
		return existingGroups;
	};

	world.login = function() {		
		return world.isLoggedIn = true;
	}

	world.logout = function() {
		return world.isLoggedIn = false;
	}

	cb(world);
};