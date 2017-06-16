var mongoose 	= require('mongoose');
var User 		= require('../models/user');
var database 	= mongoose.connection;
var Schema 		= mongoose.Schema;

// Get Model or Collection
var userInfoCollection = User;

// Debug Get Data Function
exports.getUserInfo = function(req, res) {
	console.log("Getting Data");
	userInfoCollection.find(function (err, results) {
        if (err) {return err}
        res.send(results);
      });
}