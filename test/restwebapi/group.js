var request = require('request');

var log = console.log;

var formData = {
 	name: 'TSFootballMorning',
 	displayName: 'Playing football in the morning'
};

request.post({url: 'http://localhost:4711/groups', form: formData}, function(err, httpResponse, body) {
  if (err) {
    return console.error('post failed:', err);
  }
  console.log('Upload successful!  Server responded with:', body);	
});

request.get('http://localhost:4711/groups')
.on('response', function(response) {
	log(response.statusCode);
	log(response.body);
})
.on('error', function(err) {
	log(err);
});

describe("clear group data", function() {
	before(function() {

	});

	it('clean the group data', function() {

	});

	
});