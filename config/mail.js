module.exports = {
	service: 'SendGrid',
	host: 'smtp.sendgrid.net',
	port: 587,
	secureConnection: false,
	auth: {
		user: 'hungcdqt',
		pass: 'sv99NNYMjwfW'
	},
	ignoreTLS: false,
	debug: false,
	maxConnections: 5 //default is 5
};