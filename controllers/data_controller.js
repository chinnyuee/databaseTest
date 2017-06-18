var mongoose 			= require('mongoose');
var User 				= require('../models/user');
var database 			= mongoose.connection;
var Schema 				= mongoose.Schema;
var jwt 				= require('jwt-simple');
var config 				= require('../config');
var TwilioController 	= require('../services/twilio_configurations');

// Get Model or Collection
var userInfoCollection = User;

// Debug Get Data Function
exports.getUserInfo = function(req, res) {
	// console.log("Getting Data");
	userInfoCollection.find(function (err, results) {
        if (err) {return err}
        res.send(results);
      });
}

// Get OTP Function
exports.getOneTimePassword = function(req,res){
	console.log(req);
	console.log("Inside OTP Function");
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization, decodedJSON;
        try { decodedJSON = jwt.decode(authorization, config.jwtSecret); } 
        catch (e) { return res.sendStatus(401).json({ Error: "jwtVerificationError" }); }
        var userId 			= decodedJSON.sub;
        var randomNumber 	= Math.floor((Math.random() * 900000) + 100000);

        // Get users phone number from database
        User.findOneAndUpdate({_id: userId}, {phoneOTP : randomNumber}, function(err, updatedDoc) {
			if (err) return next(err);
			var userPhoneNumber = updatedDoc.phonenumber;
			TwilioController.twilioSendOTP(userPhoneNumber, randomNumber);
			return res.json("Your OTP: " + randomNumber);
        })
    }
}

// Verify OTP Function
exports.verifyOneTimePassword = function(req,res){
	console.log("Inside OTP Function");
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization, decodedJSON;
        try { decodedJSON = jwt.decode(authorization, config.jwtSecret); } 
        catch (e) { return res.sendStatus(401).json({ Error: "jwtVerificationError" }); }
        var userId 			= decodedJSON.sub;
        var oneTimePassword = req.body.onetimepassword;
         

        User.findOne({_id: userId}, function(err, existingUser){
        	if (err) return next(err);
        	if (oneTimePassword == existingUser.phoneOTP) {
        		User.update({_id: userId}, {phoneverified : true}, { new: true }, function(err, numAffected) {
					if (err) return next(err);
					return res.json("Phone Verified");
				});
			}
        });
    }
}

        // Get users phone number from database
   //      User.findOneAndUpdate({_id: userId}, {phoneOTP : randomNumber}, function(err, updatedDoc) {
			// if (err) return next(err);
			// var userPhoneNumber = updatedDoc.phonenumber;
			// TwilioController.twilioSendOTP(userPhoneNumber, randomNumber);
			// return res.json("Your OTP: " + randomNumber);
   //      })



    //     User.findOne({_id: userId}, function(err, existingUser){
    //     	if (err) return next(err);
    //         var userPhoneNumber = existingUser.phonenumber;
    //         var randomNumber = Math.floor(Math.random() * 1000000);
    //         User.update({_id: userId}, {phoneOTP : randomNumber}, { new: true }, function(err, numAffected, document) {
				// if (err) return next(err);
				// TwilioController.twilioSendOTP(userPhoneNumber, randomNumber);
				// return res.json(document);
    //         })
    //     });