var User 	= require('../models/user');
var config 	= require('../config');
var jwt 	= require('jwt-simple');

// Local Function to create JSON Web Token
function tokenForUser(userObject) {
	var timeStamp = new Date().getTime();
	return jwt.encode({
		sub: userObject.id,
		iat: timeStamp
	}, config.jwtSecret);
}

// Sign In Function
exports.signIn = function(req, res, next) {
	var user = req.user;
	res.send({token: tokenForUser(user), user_id: user._id});
}

// Sign Up Function
exports.signUp = function(req, res, next) {
	console.log("Signing Up");
	// Get User Data
	var email = req.body.email;
	var password = req.body.password;

	// Validate Email and Password
	if(!email || ! password) {
		return res.status(422).json ({Error: "You must provide and email and password."});
	}

	// Check whether Email already used
	User.findOne({email: email}, function(err, existingUser){
		if (err) return next(err);
		if (existingUser) return res.status(422).json({Error: "Email already exists, please use another email!"});

		// Create User Object
		var newUser = new User({
			email: email,
			password: password
		});

		// Add User To Database
		newUser.save(function(err){
			if (err) return next(err);
			res.json({user_id: newUser._id, token: tokenForUser(newUser)});
		});
	});
}