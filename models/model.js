'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var modelSchema = new Schema({
});

var myPlugin = function(schema, options) {
};

modelSchema.plugin(myPlugin);


module.exports = mongoose.model('', modelSchema);
