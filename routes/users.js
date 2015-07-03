//a resourceful routing
var mongoose = require('mongoose');

module.exports = function() {
	var UserModel = require('../models/user');
	return {
		//get users
		index: function(request, response) {

			// if (ensureAuthenticated(request, response)) {
			if (false || !request.session.loggedIn) {
				console.log('need to be logged');
				response.send(401);
			} else {
				console.log('user listing');
			    return UserModel.find(null, null, {skip: 0, limit: 100}, function(err, users) {
			        if (!err) {
			            return response.send(users);
			        } else {
			            return console.log(err);
			        }
			    });
			}
		},
		//get a single user by id
		show: function(request, response) {
		    return UserModel.findById(request.params.user, 'username', function(err, user) {
		        if (!err) {
		            return response.send(user);
		        } else {
		            return console.log(err);
		        }
		    });
		},
		//Delete a user
		destroy: function( request, response ) {
		    console.log( 'Deleting user with id: ' + request.params.user );
		    return UserModel.findById( request.params.user, function( err, user ) {
		        return user.remove( function( err ) {
		            if( !err ) {
		                console.log( 'User removed' );
		                return response.send( '' );
		            } else {
		                console.log( err );
		            }
		        });
		    });
		}
	};
};