'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Group = new Schema({
    name: String,
    displayName: String,
    tags: String,
    // createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    // organizer: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    active: {type: Boolean, default: true}
});

var myPlugin = function(schema, options) {
}

Group.plugin(myPlugin);


module.exports = mongoose.model('Group', Group);
