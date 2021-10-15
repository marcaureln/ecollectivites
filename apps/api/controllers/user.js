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

let check = function (req, res, next) {
	const phone = req.body.phone;
	const code = req.body.code;
	if (!phone || !code) {
		res.status(400).json({ error: 'Invalid code or phone number' });
		return;
	}
	twilio.verify
		.services('VA4e4b5df8e6bdd3bdcdcd127dbecc2e43')
		.verificationChecks.create({ to: phone, code: code })
		.then((verificationCheck) => {
			switch (verificationCheck.status) {
				case 'approved':
					res.status(200).json({ message: 'Phone verified successfully!' });
					break;
				case 'canceled':
					res.status(404).json({ message: 'Verification cancelled!' });
					break;
				default:
					res.status(401).json({ message: 'Wrong code!' });
					break;
			}
			return;
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

module.exports = { verify, check, signup, login };
