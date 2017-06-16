module.exports = {
    jwtSecret: "M4v3n7S3cr3tK3Y",
    jwtSession: { session: false }
};

module.exports.loadConfigurations = function() {
	process.env.MONGOOSE_CONNECT = 'mongodb://localhost/maventdatabase';
	process.env.PORT = 3000;
	process.env.HOST = '127.0.0.1';
};