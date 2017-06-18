var express		= require('express');
var morgan 		= require('morgan');
var bodyParser 	= require('body-parser');
var mongoose 	= require('mongoose');

// Initialize express application and router
var app = express();

// Load Configurations and Constants
var configurations = require('./config.js');
configurations.loadConfigurations();

// Connect to database
mongoose.connect(process.env.MONGOOSE_CONNECT);

// Constants
var PORT = process.env.PORT;
var HOST = process.env.HOST;

// Middleware Initialization
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use(twilioNotifications.notifyOnError);


// Map Router
var apiRouter = require('./services/router');
app.use('/' , apiRouter);

// Listen on Port
app.listen(PORT, HOST ,function(){
	console.log('Server Running on port ' + PORT);
});

// Twilio Manager
// var TwilioController = require('./services/twilio_configurations');
// TwilioController.twilioSendOTP('+6593264036', '123123');


// Bind connection to on Error Event
// var databaseRef = mongoose.connection;
// databaseRef.on('error', console.error.bind(console, 'MongoDB Connection Error'));

// // Server routes
// var index = require('./routes/index');
// var tasks = require('./routes/tasks');
// var registerAccount = require('./routes/registerAccount');


// // Routes configuration
// app.use('/', 	index);
// app.use('/api', tasks);
// app.use('/registerAccount', registerAccount);

/*
// Mongo Native Method 1
// Include Mongo Module
var mongo = require('mongodb');
// Create Server Instance
var serverInstance = new mongo.Server('127.0.0.1', 27017, {auto_reconnect: true});
// Retrieve Database
var databaseReference = new mongo.Db('hockey', serverInstance);
// Open Database Connection

databaseReference.open(function(err, dbRef){
	// Connection Established in here
	if (!err) {
		console.log("We are Connected to testDatabase");

		// Access Collection Name
		dbRef.collection('hockey', function(err, collectionRef) { 
	    	console.log(collectionRef.collectionName);
		});	

		// Show All Collection
		dbRef.listCollections().toArray(function(err, collectionInfo) {
    		console.log(collectionInfo);
		});
	} else {
		console.log("We failed! ):");
	}
});

// Close Database connection
//databaseReference.close();
*/

// // This is a test function
// var MongoClient = require('mongodb').MongoClient;
// MongoClient.connect("mongodb://localhost:27017/hockey", function (err, dbRef) {
//     if(err) throw err;
//     console.log("Database connection successful.");
//   //    dbRef.listCollections().toArray(function(err, collectionInfo) {
//   //   		console.log(collectionInfo);
// 		// });

	
// });	


// // View Engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

// // Set Static Folder
// app.use(express.static(path.join(__dirname, 'client')));

