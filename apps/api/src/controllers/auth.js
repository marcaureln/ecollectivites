const JWT_SECRET = process.env.JWT_AUTH_SECRET;
const JWT_VALIDITY = process.env.JWT_AUTH_TOKEN_VALIDITY;
const VERIFY_JWT_SECRET = process.env.JWT_VERIFY_SECRET;

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AppError } = require('../helpers/error');

/**  @type { PrismaClient } */
const prisma = require('../helpers/prisma').default;

exports.login = async function (req, res, next) {
	const method = req.body.method;

	if (method === 'email') {
		emailLogin(req, res, next);
	} else if (method === 'phone') {
		phoneLogin(req, res, next);
	} else {
		const error = new AppError(400, 'No authentication method provided');
		next(error);
	}
};

async function emailLogin(req, res, next) {
	const { email, password } = req.body;

	try {
		if (!email || !password) {
			throw new AppError(400, 'Missing required fields');
		}

		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			throw new AppError(404, 'Incorrect email or password');
		}

		const match = await bcrypt.compare(password, user.password);

		if (match) {
			delete user.password;
			user.token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_VALIDITY });
			res.status(200).json(user);
		} else {
			throw new AppError(404, 'Incorrect email or password');
		}
	} catch (error) {
		next(error);
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

	try {
		if (!decodedToken) {
			return res.status(401).json({ error: 'Invalid phone verification token' });
		}

		const phone = decodedToken.phone;

		if (req.body.phone && req.body.phone !== phone) {
			throw new AppError(400, 'Invalid phone number');
		}

		const user = await prisma.user.findUnique({ where: { phone } });

		if (!user) {
			throw new AppError(404, 'No user found');
		} else {
			delete user.password;
			user.token = jwt.sign({ userId, firstname, lastname, phone }, JWT_SECRET, { expiresIn: JWT_VALIDITY });
			res.status(200).json(user);
		}
	} catch (error) {
		next(error);
	}
}

exports.signup = async function (req, res, next) {
	const method = req.body.method;

	if (method === 'email') {
		emailSignup(req, res, next);
	} else if (method === 'phone') {
		phoneSignup(req, res, next);
	} else {
		const error = new AppError(400, 'No authentication method provided');
		next(error);
	}
};

async function emailSignup(req, res, next) {
	const { firstname, lastname, email, password, collectId } = req.body;

	try {
		if (!firstname || !lastname || !email || !password || !collectId) {
			throw new AppError(400, 'Missing required fields');
		}

		if (await prisma.user.findUnique({ where: { email } })) {
			throw new AppError(400, 'Email already in use');
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
		next(error);
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

	try {
		if (!decodedToken) {
			throw new AppError(401, 'Invalid phone verification token');
		}

		const phone = decodedToken.phone;

		if (req.body.phone && req.body.phone !== phone) {
			throw new AppError(400, 'Invalid phone number');
		}

		const { firstname, lastname, collectId } = req.body;

		if (!firstname || !lastname || !collectId) {
			throw new AppError(400, 'Missing required fields');
		}

		if (await prisma.user.findUnique({ where: { phone } })) {
			throw new AppError(400, 'Phone number already in use');
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

		delete user.password;
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
}
