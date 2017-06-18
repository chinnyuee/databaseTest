var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;
var bcrypt 		= require('bcrypt-nodejs');

var validateEmail = (email) => {
	return(/\S+@\S+\.\S+/).test(email);
}

var userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		lowercase: true,
		required: 'Username is required.'
	},
	password: {
		type: String,
		required: 'Password is required.'
	},
	phonenumber: {
		type: String,
		required: 'Phone Number is required'
	},
	phoneOTP: {
		type: Number
	},
	phoneverified: {
		type: Boolean,
		default: false
	},
	firstname: {
		type: String,
		required: 'First Name is required.'
	},
	lastname: {
		type: String,
		required: 'Last Name is required.'
	},
	dateofbirth: {
		type: String,
		required: 'DOB is required.'
	},
	gender: {
		type: String,
		required: 'Gender is required.'
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		required: 'Email address is required.',
		validate: [validateEmail, 'Please enter a valid email.']
	}
	
}, { collection: 'userInfo' });

userSchema.pre('save', function(next) {
	var user = this;
	if(user.isNew || user.isModified('password')) {
		console.log("Hashing Password");
		bcrypt.genSalt(10, function(err, salt){
			if (err) return next(err);
			bcrypt.hash (user.password, salt, null, function(err,hash){
				if (err) return next(err);
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if (err) { return callback (err) }
			callback(null, isMatch);
	});
}

module.exports = mongoose.model('User', userSchema);