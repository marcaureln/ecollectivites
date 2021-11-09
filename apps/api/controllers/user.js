const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioVerifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
const twilio = require('twilio')(twilioAccountSid, twilioAuthToken);

const jwtAuthSecret = process.env.JWT_AUTH_SECRET;
const jwtVerifySecret = process.env.JWT_VERIFY_SECRET;
const jwtAuthTokenValidity = process.env.JWT_AUTH_TOKEN_VALIDITY;
const jwtVerifyTokenValidity = process.env.JWT_VERIFY_TOKEN_VALIDITY;
const jwt = require('jsonwebtoken');

const db = require('../helpers/db');

exports.verify = function (req, res, next) {
	const phone = req.body.phone;

	if (!phone || phone.length != 10) {
		return res.status(400).json({ error: 'Invalid phone number' });
	}

	twilio.verify
		.services(twilioVerifyServiceSid)
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
		.services(twilioVerifyServiceSid)
		.verificationChecks.create({ to: '+225' + phone, code: code })
		.then((verificationCheck) => {
			if (verificationCheck.status == 'approved') {
				const token = jwt.sign({ phone }, jwtVerifySecret, { expiresIn: jwtVerifyTokenValidity });
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

exports.signup = async function (req, res, next) {
	const decodedToken = (function () {
		try {
			const token = req.headers.authorization.split(' ')[1];
			return jwt.verify(token, jwtVerifySecret);
		} catch {
			return undefined;
		}
	})();

	if (!decodedToken) {
		return res.status(401).json({ error: 'Invalid token' });
	}

	const { firstname, lastname, phone } = req.body;

	if (!firstname || !lastname || !phone || phone != decodedToken.phone) {
		return res.status(400).json({ error: 'Invalid arguments' });
	}

	const findQueryResult = await db.query('SELECT phone FROM users WHERE phone = $1', [phone]);

	if (findQueryResult.rowCount != 0) {
		return res.status(409).json({ message: 'User already exists' });
	}

	try {
		const insertQueryString = 'INSERT INTO users (firstname, lastname, phone) VALUES ($1, $2, $3) RETURNING user_id';
		const insertQueryParams = [firstname, lastname, phone];
		const insertQueryResult = await db.query(insertQueryString, insertQueryParams);
		const { user_id } = insertQueryResult.rows[0];
		const token = jwt.sign({ user_id, firstname, lastname, phone }, jwtAuthSecret, { expiresIn: '24h' });
		res.status(201).json({ user_id, firstname, lastname, phone, token });
	} catch {
		res.status(500).json({ error: 'Unable to sign you up' });
	}
};

exports.login = async function (req, res, next) {
	const decodedToken = (function () {
		try {
			const token = req.headers.authorization.split(' ')[1];
			return jwt.verify(token, jwtVerifySecret);
		} catch {
			return undefined;
		}
	})();

	if (!decodedToken) {
		return res.status(401).json({ error: 'Invalid token' });
	}

	const phone = decodedToken.phone;

	if (req.body.phone && req.body.phone !== phone) {
		return res.status(400).json({ error: 'Invalid phone number' });
	}

	const { rows } = await db.query('SELECT * FROM users WHERE phone = $1', [phone]);

	if (rows.length <= 0) {
		res.status(404).json({ error: 'No user found' });
	} else {
		const { user_id, firstname, lastname } = rows[0];
		const token = jwt.sign({ user_id, firstname, lastname, phone }, jwtAuthSecret, { expiresIn: jwtAuthTokenValidity });
		res.status(200).json({ user_id, firstname, lastname, phone, token });
	}
};
