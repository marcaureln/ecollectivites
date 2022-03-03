const bcrypt = require('bcrypt');
const { PrismaClient, Role } = require('@prisma/client');
const { AppError } = require('../helpers/error');

/** @type { PrismaClient } **/
const prisma = require('../helpers/prisma').default;

exports.getUser = async function (req, res, next) {
	const userId = req.auth?.userId ?? req.params.id;

	try {
		if (!userId) {
			throw new AppError(400, 'Missing required fields');
		}

		const user = await prisma.user.findUnique({ where: { userId } });

		if (!user) {
			throw new AppError(404, 'User not found');
		}

		delete user.password;
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

exports.createUser = async function (req, res, next) {
	const { firstname, lastname, email, password, role, collectId } = req.body;

	try {
		if (!firstname || !lastname || !email || !password || !role || !collectId) {
			throw new AppError(400, 'Missing required fields');
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {
				firstname,
				lastname,
				email,
				collectId,
				role,
				password: hashedPassword,
				passChangedAt: new Date(),
				passMaxAge: 0,
			},
		});

		delete user.password;
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
};

exports.updateUser = async function (req, res, next) {
	const userId = req.auth?.userId ?? req.params.id;
	const { firstname, lastname, email, phone } = req.body;

	try {
		if (!userId) {
			throw new AppError(400, 'Missing required fields');
		}

		const user = await prisma.user.findUnique({ where: { userId } });

		if (!user) {
			throw new AppError(404, 'User not found');
		}

		const updatedUser = await prisma.user.update({
			where: { userId },
			data: { firstname, lastname, email, phone },
		});

		delete updatedUser.password;
		res.status(200).json(updatedUser);
	} catch (error) {
		next(error);
	}
};

exports.getUserRequests = async function (req, res, next) {
	const userId = req.auth?.userId ?? req.params.id;

	try {
		if (!userId) {
			throw new AppError(400, 'Missing required fields');
		}

		const user = await prisma.user.findUnique({ where: { userId } });

		if (!user) {
			throw new AppError(404, 'User not found');
		}

		const requests = await prisma.request.findMany({
			where: {
				userId,
			},
		});

		res.status(200).json(requests);
	} catch (error) {
		next(error);
	}
};

exports.getUserResponses = async function (req, res, next) {
	const userId = req.auth?.userId ?? req.params.id;

	try {
		if (!userId) {
			throw new AppError(400, 'Missing required fields');
		}

		const user = await prisma.user.findUnique({ where: { userId } });

		if (!user) {
			throw new AppError(404, 'User not found');
		}

		const responses = await prisma.response.findMany({
			where: {
				userId,
			},
		});

		res.status(200).json(responses);
	} catch (error) {
		next(error);
	}
};

exports.changePassword = async function (req, res, next) {
	const { email, currentPassword, newPassword } = req.body;

	try {
		if (!email || !currentPassword || !newPassword) {
			throw new AppError(400, 'Missing required fields');
		}

		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			throw new AppError(404, 'User not found');
		}

		const match = await bcrypt.compare(currentPassword, user.password);

		if (match) {
			const hashedPassword = await bcrypt.hash(newPassword, 10);
			await prisma.user.update({
				where: { email },
				data: { password: hashedPassword, passChangedAt: new Date(), passMaxAge: 99999 },
			});
			res.status(200).json({});
		} else {
			throw new AppError(401, 'Passwords do not match');
		}
	} catch (error) {
		next(error);
	}
};

exports.getUserRoles = async function (req, res, next) {
	res.status(200).json(Object.keys(Role));
};
