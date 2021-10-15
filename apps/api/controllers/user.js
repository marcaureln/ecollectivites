const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilio = require('twilio')(accountSid, authToken);

let verify = function (req, res, next) {
	const phone = req.body.phone;
	if (!phone) {
		res.status(400).json({ error: 'Invalid phone number' });
		return;
	}
	twilio.verify
		.services('VA4e4b5df8e6bdd3bdcdcd127dbecc2e43')
		.verifications.create({ to: phone, channel: 'sms', locale: 'fr' })
		.then((verification) => {
			let message = 'Code sended to ' + verification.to + ' verification ' + verification.status;
			res.status(200).json({ message });
		})
		.catch((error) => {
			res.status(error.status).json({ error: error.message });
		});
};

let signup = function (req, res, next) {
	res.status(200).send('/api/auth/signup');
};

let login = function (req, res, next) {
	res.status(200).send('/api/auth/login');
};

module.exports = { verify, signup, login };
