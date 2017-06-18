var express 		= require('express');
var router 			= express.Router();
var passport 		= require('passport');
var passportService = require('./passport');

var AuthenticationController 	= require('../controllers/authentication_controller');
var DataController				= require('../controllers/data_controller');

var requireAuth	 = passport.authenticate('jwt'	, {session: false});
var requireLogin = passport.authenticate('local', {session: false});

// Router configuration
router.route('/')						.get(displayRoot);
router.route('/secure')					.get(requireAuth,secretFunction);
router.route('/signUp')					.post(AuthenticationController.signUp);
router.route('/secureSignIn')			.post(requireLogin, AuthenticationController.signIn);
router.route('/getOneTimePassword')		.get(requireAuth, DataController.getOneTimePassword);
router.route('/verifyOneTimePassword')	.post(requireAuth, DataController.verifyOneTimePassword);

// Debug Routes
router.route('/getUserInfoDB')	.get(DataController.getUserInfo);

// Local Function Declaration
function secretFunction(req, res, next) {
	res.send("Secret");
}

function displayRoot(req, res, next) {
	res.send("Root");
}

module.exports = router;
