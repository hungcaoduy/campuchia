var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var GoogleUserSchema = new Schema({
	googleID: String,
	email: {type: String, lowercase: true},
	name: String
});


module.exports = mongoose.model('GoogleUser', GoogleUserSchema);