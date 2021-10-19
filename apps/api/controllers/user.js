const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

const twilio = require('twilio')(accountSid, authToken);

const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const db = require('../helpers/db');

exports.verify = function (req, res, next) {
	const phone = req.body.phone;

	if (!phone || phone.length > 10) {
		res.status(400).json({ error: 'Invalid phone number' });
		return;
	}

	twilio.verify
		.services(verifyServiceSid)
		.verifications.create({ to: '+225' + phone, channel: 'sms', locale: 'fr' })
		.then((verification) => {
			let message = 'Code sended to ' + verification.to + ' verification ' + verification.status;
			res.status(200).json({ message });
		})
		.catch((error) => {
			res.status(error.status).json({ error: error.message });
		});
};

exports.check = function (req, res, next) {
	const phone = req.body.phone;
	const code = req.body.code;

	if (!phone || !code || phone.length > 10) {
		res.status(400).json({ error: 'Invalid code or phone number' });
		return;
	}

	twilio.verify
		.services(verifyServiceSid)
		.verificationChecks.create({ to: '+225' + phone, code: code })
		.then((verificationCheck) => {
			switch (verificationCheck.status) {
				case 'approved':
					const token = jwt.sign({ phone }, jwtSecret, { algorithm: 'HS256', expiresIn: '10m' });
					res.status(200).json({ phone, token });
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

exports.signup = async function (req, res, next) {
	const token = req.headers.authorization.split(' ')[1];
	const decodedToken = jwt.decode(token, jwtSecret);

	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const phone = req.body.phone;

	if (firstname && lastname && phone && phone == decodedToken.phone) {
		db.query('INSERT INTO users (firstname, lastname, phone) VALUES ($1, $2, $3)', [firstname, lastname, phone])
			.then((result) => {
				const token = jwt.sign({ firstName, lastname, phone }, jwtSecret, { algorithm: 'HS256', expiresIn: '24h' });
				res.status(200).json({ firstName, lastname, phone, token });
			})
			.catch((error) => {
				console.error(error);
				res.status(500).json({ error });
			});
	} else {
		res.status(400).json({ error: 'Invalid arguments' });
	}
};

exports.login = async function (req, res, next) {
	const token = req.headers.authorization.split(' ')[1];

	const decodedToken = jwt.decode(token, jwtSecret);

	const phone = decodedToken.phone;

	if (req.body.phone && req.body.phone !== phone) {
		res.status(400).json({ error: 'Invalid phone number' });
	} else {
		const { rows } = await db.query('SELECT * FROM users WHERE phone = $1', [phone]);
		if (rows.length <= 0) {
			res.status(401).json({ error: 'No user found' });
		} else {
			const { firstName, lastname } = rows[0];
			const token = jwt.sign({ firstName, lastname, phone }, jwtSecret, { algorithm: 'HS256', expiresIn: '24h' });
			res.status(200).json({ firstName, lastname, phone, token });
		}
	}
};
