//a resourceful routing
var mongoose = require('mongoose');

module.exports = function() {
	var GroupModel = require('../models/group');
	var ensureAuthenticated = function(request, response) {
		console.log('check authenticated 1');
		if (!request.session.loggedIn) {
			console.log('will redirect');
			response.redirect('http://localhost:4711/#login');
		}
		console.log('check authenticated 2');
		return request.session.loggedIn;
	};
	return {
		//get groups
		index: function(request, response) {
			// if (ensureAuthenticated(request, response)) {
			if (false && !request.session.loggedIn) {
				console.log('need to be logged');
				response.sendStatus(401);
			} else {
				console.log('group listing');
			    return GroupModel.find(null, null, {skip: 0, limit: 100}, function(err, groups) {
			        if (!err) {
			            return response.send(groups);
			        } else {
			            return console.log(err);
			        }
			    });
			}
		},
		new: function( request, response) {
			response.send('please create a create new form and submit to create');
		},
		//insert a new group
		create: function(request, response) {
		    var group = new GroupModel({
		        name: request.body.name,
		        displayName: request.body.displayName,
		        tags: request.body.tags
		    });
		    group.save(function(err) {
		        if (!err) {
		            console.log('created');
		            return response.send(group);
		        } else {
		            return console.log("saving ", group, " got error ", err);
		        }
		    });
		},
		//get a single group by id
		show: function(request, response) {
		    // console.log('request.params:', request.params);
		    return GroupModel.findById(request.params.group, function(err, group) {
		        if (!err) {
		            return response.send(group);
		        } else {
		            return console.log(err);
		        }
		    });
		},
		//Update a group
		update: function( request, response ) {
		    try {
		        return GroupModel.findById( request.params.group, function( err, group ) {
			        group.name = request.body.name;
			        group.displayName = request.body.displayName;
			        group.tags = request.body.tags;
		            return group.save( function( err ) {
		                if( !err ) {
		                    console.log( 'group updated' );
		                } else {
		                    console.log("updating ", group, " got error ", err);
		                }
		                return response.send( group );
		            });
		        });
		    } catch (exeption) {
		        console.log('something went wrong');
		    } finally {
		        console.log( 'Updating group ' + request.body );
		    }
		},
		//Delete a group
		destroy: function( request, response ) {
		    console.log( 'Deleting group with id: ' + request.params.group );
		    return GroupModel.findById( request.params.group, function( err, group ) {
		        return group.remove( function( err ) {
		            if( !err ) {
		                console.log( 'Group removed' );
		                return response.send( '' );
		            } else {
		                console.log( err );
		            }
		        });
		    });
		}
	};
};