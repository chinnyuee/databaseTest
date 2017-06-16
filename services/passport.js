const passport 		= require('passport')
const ExtractJwt 	= require('passport-jwt').ExtractJwt;
const JwtStrategy 	= require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');

const User 		= require('../models/user');
const config	= require('../config');

var jwtParameters = {
   	secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromHeader('authorization')
}

var localParameters = {
	usernameField: 'email'
}

var localStrategy = new LocalStrategy(localParameters, function(userEmail, password, done){
	User.findOne({email:userEmail}, function (err, existingUser) {
		if (err) 			{ return done(err,  false) }
		if (!existingUser)	{ return done(null, false) }
		existingUser.comparePassword(password, function(err, isMatch){
			if (err) 		{ return done(err) }
			if (!isMatch) 	{ return done(null, false) }
			return done(null, existingUser);
		});
	});
});

var jwtStrategy = new JwtStrategy(jwtParameters, function(payload, done){
	User.findById(payload.sub, function(err, user){
		if (err) { return done(err, false) };
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	})
});

passport.use(jwtStrategy);
passport.use(localStrategy);