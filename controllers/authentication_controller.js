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
	var username 	= req.body.username;
	var password 	= req.body.password;
	var phonenumber = req.body.phonenumber;
	var firstname 	= req.body.firstname;
	var lastname 	= req.body.lastname;
	var dateofbirth = req.body.dateofbirth;
	var gender 		= req.body.gender;
	var email 		= req.body.email;


	// Validate Email and Password
	if(!email || ! password) {
		return res.status(422).json ({Error: "You must provide and email and password."});
	}

	// Check whether Email already used
	User.findOne({$or:[{email: email}, {username: username}]}, function(err, existingUser){
		if (err) return next(err);
		if (existingUser && existingUser.username === username) return res.status(422).json({
			Error: "usernameExistError",
			ErrorMsg: "Username already exists, please use another username!"
		});
		if (existingUser && existingUser.email === email) return res.status(422).json({
			Error: "emailExistError",
			ErrorMsg: "Email already exists, please use another email!"
		});
		

		// Create User Object
		var newUser = new User({
			username 		:username,
			password 		:password,
			phonenumber 	:phonenumber,
			firstname		:firstname,
			lastname 		:lastname,
			dateofbirth 	:dateofbirth,
			gender 			:gender,
			email 			:email

		});

	// Add User To Database
		newUser.save(function(err){
			if (err) return next(err);
			res.json({user_id: newUser._id, token: tokenForUser(newUser)});
		});
	});

}