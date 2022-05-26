const TWILIO_ACCOUND_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE = process.env.TWILIO_PHONE;

const twilio = require('twilio')(TWILIO_ACCOUND_SID, TWILIO_AUTH_TOKEN);

exports.sendSMS = function (phone, message) {
  try {
    twilio.messages
      .create({
        from: TWILIO_PHONE,
        to: phone,
        body: message,
      })
      .then((message) => console.log(message.body));
  } catch (error) {
    console.log(error);
  }
};

exports.sendMail = function (email, subject, message) {
  console.log('An email should be sended to ' + email);
};
