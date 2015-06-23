//a resourceful routing
module.exports = function(mongoose) {
	var GroupModel = require('../models/group')();
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
			if (!request.session.loggedIn) {
				console.log('need to be logged');
				response.send(401);
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
		//insert a new group
		new: function(request, response) {
		    var group = new GroupModel({
		        title: request.body.title,
		        description: request.body.description,
		        effectiveDate: request.body.effectiveDate,
		        keywords: [], //request.body.keywords,
		        createdDate: new Date(),
		        createdBy: 'Unknown',
		        updatedDate: new Date(),
		        updatedBy: 'Unknown'
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
		            group.title = request.body.title;
		            group.description = request.body.description;
		            group.effectiveDate = request.body.effectiveDate;
		            group.keywords = [];//request.body.keywords;
		            group.createdDate = new Date();
		            group.createdBy = 'Unknown';
		            group.updatedDate = new Date();
		            group.updatedBy = 'Unknown';
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