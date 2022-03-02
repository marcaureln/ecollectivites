const JWT_SECRET = process.env.JWT_AUTH_SECRET;
const JWT_VALIDITY = process.env.JWT_AUTH_TOKEN_VALIDITY;
const VERIFY_JWT_SECRET = process.env.JWT_VERIFY_SECRET;

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**  @type { PrismaClient } */
const prisma = require('../helpers/prisma').default;

exports.login = async function (req, res, next) {
	const method = req.body.method;

	if (method === 'email') {
		emailLogin(req, res, next);
	} else if (method === 'phone') {
		phoneLogin(req, res, next);
	} else {
		return res.status(400).json({ error: 'No authentication method provided' });
	}
};

async function emailLogin(req, res, next) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).send();
	}

	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) {
		return res.status(404).json({ error: 'Incorrect email or password' });
	}

	const match = await bcrypt.compare(password, user.password);

	if (match) {
		const { userId, firstname, lastname, role, email, collectId } = user;
		const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_VALIDITY });
		res.status(200).json({ userId, firstname, lastname, role, email, collectId, token });
	} else {
		res.status(404).json({ error: 'Incorrect email or password' });
	}
}

async function phoneLogin(req, res, next) {
	const decodedToken = (function () {
		try {
			const token = req.headers.authorization.split(' ')[1];
			return jwt.verify(token, VERIFY_JWT_SECRET);
		} catch {
			return undefined;
		}
	})();

	if (!decodedToken) {
		return res.status(401).json({ error: 'Invalid phone verification token' });
	}

	const phone = decodedToken.phone;

	if (req.body.phone && req.body.phone !== phone) {
		return res.status(400).json({ error: 'Invalid phone number' });
	}

	const user = await prisma.user.findUnique({ where: { phone } });

	if (!user) {
		res.status(404).json({ error: 'No user found' });
	} else {
		const { userId, firstname, lastname, role, phone, collectId } = user;
		const token = jwt.sign({ userId, firstname, lastname, phone }, JWT_SECRET, { expiresIn: JWT_VALIDITY });
		res.status(200).json({ userId, firstname, lastname, role, phone, collectId, token });
	}
}

exports.signup = async function (req, res, next) {
	const method = req.body.method;

	if (method === 'email') {
		emailSignup(req, res, next);
	} else if (method === 'phone') {
		phoneSignup(req, res, next);
	} else {
		return res.status(400).json({ error: 'No authentication method provided' });
	}
};

async function emailSignup(req, res, next) {
	const { firstname, lastname, email, password, collectId } = req.body;

	if (!firstname || !lastname || !email || !password || !collectId) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	try {
		if (await prisma.user.findUnique({ where: { email } })) {
			return res.status(400).json({ error: 'Email already in use' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {
				firstname,
				lastname,
				email,
				collectId,
				role: 'USER',
				password: hashedPassword,
				passChangedAt: new Date(),
				passMaxAge: 99999,
			},
		});

		delete user.password;
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
}

async function phoneSignup(req, res, next) {
	const decodedToken = (function () {
		try {
			const token = req.headers.authorization.split(' ')[1];
			return jwt.verify(token, VERIFY_JWT_SECRET);
		} catch {
			return undefined;
		}
	})();

	if (!decodedToken) {
		return res.status(401).json({ error: 'Invalid phone verification token' });
	}

	const phone = decodedToken.phone;

	if (req.body.phone && req.body.phone !== phone) {
		return res.status(400).json({ error: 'Invalid phone number' });
	}

	const { firstname, lastname, collectId } = req.body;

	if (!firstname || !lastname || !collectId) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	try {
		if (await prisma.user.findUnique({ where: { phone } })) {
			return res.status(400).json({ error: 'Phone number already in use' });
		}

		const user = await prisma.user.create({
			data: {
				firstname,
				lastname,
				phone,
				collectId,
				role: 'USER',
			},
		});

		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
}
