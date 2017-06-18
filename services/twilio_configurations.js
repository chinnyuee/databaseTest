// TWILIO CONFIGURATIONS
var twilio = require('twilio');
var twilioConfigurations = {};

twilioConfigurations.TWILIO_ACCOUNT_SID 	= process.env.TWILIO_ACCOUNT_SID;
twilioConfigurations.TWILIO_AUTH_TOKEN 		= process.env.TWILIO_AUTH_TOKEN;
twilioConfigurations.TWILIO_PHONE_NUMBER	= process.env.TWILIO_PHONE_NUMBER;

var twilioConfig = [twilioConfigurations.TWILIO_ACCOUNT_SID, twilioConfigurations.TWILIO_AUTH_TOKEN, twilioConfigurations.TWILIO_PHONE_NUMBER];
var isTwilioConfugured = twilioConfig.every(function(configValue){
	return configValue || false;
});

if (!isTwilioConfugured) {
  var errorMessage ='TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set!';
  throw new Error(errorMessage);
}

var twilioClient = twilio(twilioConfigurations.TWILIO_ACCOUNT_SID, twilioConfigurations.TWILIO_AUTH_TOKEN);

// Send One Time Password Message
exports.twilioSendOTP = function(phoneNumber, inputOTP) {
	twilioClient.api.messages.create({
		  to: 	phoneNumber,
		  from: twilioConfigurations.TWILIO_PHONE_NUMBER,
		  body: 'Your Mavent verification code is: ' + inputOTP
		}).then(function(data) {
		      console.log('One Time Password Sent: ' + inputOTP);
	});
}