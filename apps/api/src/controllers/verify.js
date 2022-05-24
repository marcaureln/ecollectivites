const TWILIO_ACCOUND_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_VERIFY_SID = process.env.TWILIO_VERIFY_SERVICE_SID;
const VERIFY_JWT_SECRET = process.env.JWT_VERIFY_SECRET;
const VERIFY_JWT_VALIDITY = process.env.JWT_VERIFY_TOKEN_VALIDITY;

const twilio = require('twilio')(TWILIO_ACCOUND_SID, TWILIO_AUTH_TOKEN);
const jwt = require('jsonwebtoken');

exports.verify = function (req, res, next) {
	const phone = req.body.phone;

	if (!phone || phone.length != 10) {
		return res.status(400).json({ error: 'Invalid phone number' });
	}

	twilio.verify
		.services(TWILIO_VERIFY_SID)
		.verifications.create({ to: '+225' + phone, channel: 'sms', locale: 'fr' })
		.then((verification) => {
			res.status(200).json({ message: 'Verification code sended to ' + verification.to });
		})
		.catch((error) => {
			res.status(error.status).json({ error: error.message });
		});
};

exports.check = function (req, res, next) {
	const phone = req.body.phone;
	const code = req.body.code;

	if (!phone || !code || phone.length != 10) {
		return res.status(400).json({ error: 'Invalid code or phone number' });
	}

	twilio.verify
		.services(TWILIO_VERIFY_SID)
		.verificationChecks.create({ to: '+225' + phone, code: code })
		.then((verificationCheck) => {
			if (verificationCheck.status == 'approved') {
				const token = jwt.sign({ phone }, VERIFY_JWT_SECRET, { expiresIn: VERIFY_JWT_VALIDITY });
				res.status(200).json({ phone, token });
			} else if (verificationCheck.status == 'canceled') {
				res.status(404).json({ message: 'Verification cancelled!' });
			} else {
				res.status(401).json({ message: 'Wrong code!' });
			}
		})
		.catch((error) => {
			res.status(error.status).json({ error: error.message });
		});
};
