module.exports = {
    jwtSecret: 'M4v3n7S3cr3tK3Y',
    jwtSession: { session: false }
};

module.exports.loadConfigurations = function() {
	process.env.MONGOOSE_CONNECT = 'mongodb://localhost/maventdatabase';
	process.env.PORT = 3000;
	process.env.HOST = '0.0.0.0';
	process.env.TWILIO_ACCOUNT_SID 	= 'AC42b7e8b15c6a55cafc9e88bc85deff13';
	process.env.TWILIO_AUTH_TOKEN 	= 'bf925f357f58d43fef7e07e5918012f7';
	process.env.TWILIO_PHONE_NUMBER = '+17855464139';
};
