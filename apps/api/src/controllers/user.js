const { PrismaClient, Role } = require('@prisma/client');

const bcrypt = require('bcrypt');

/** @type { PrismaClient } **/
const prisma = require('../helpers/prisma').default;

exports.getUser = async function (req, res, next) {
	const userId = req.auth?.userId ?? req.params.id;

	if (!userId) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	try {
		const user = await prisma.user.findUnique({ where: { userId } });

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		delete user.password;
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

exports.createUser = async function (req, res, next) {
	const { firstname, lastname, email, password, role, collectId } = req.body;

	if (!firstname || !lastname || !email || !password || !role || !collectId) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	try {
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
		res.status(500).json({ error: 'Internal server error' });
	}
};

exports.updateUser = async function (req, res, next) {
	const userId = req.auth?.userId ?? req.params.id;
	const { firstname, lastname, email, phone } = req.body;

	if (!userId) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	try {
		const user = await prisma.user.findUnique({ where: { userId } });

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		const updatedUser = await prisma.user.update({
			where: { userId },
			data: { firstname, lastname, email, phone },
		});

		delete updatedUser.password;
		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

exports.getUserRequests = async function (req, res, next) {
	const userId = req.auth?.userId ?? req.params.id;

	if (!userId) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	try {
		const user = await prisma.user.findUnique({ where: { userId } });

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		const requests = await prisma.request.findMany({
			where: {
				userId,
			},
		});

		res.status(200).json(requests);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

exports.getUserResponses = async function (req, res, next) {
	const userId = req.auth?.userId ?? req.params.id;

	if (!userId) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	try {
		const user = await prisma.user.findUnique({ where: { userId } });

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		const responses = await prisma.response.findMany({
			where: {
				userId,
			},
		});

		res.status(200).json(responses);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

exports.changePassword = async function (req, res, next) {
	const { email, currentPassword, newPassword } = req.body;

	if (!email || !currentPassword || !newPassword) {
		return req.status(400).send();
	}

	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	const match = await bcrypt.compare(currentPassword, user.password);

	if (match) {
		try {
			const hashedPassword = await bcrypt.hash(newPassword, 10);
			await prisma.user.update({
				where: { email },
				data: { password: hashedPassword, passChangedAt: new Date(), passMaxAge: 99999 },
			});
			return res.status(200).send();
		} catch (error) {
			return res.status(500).send(error.message);
		}
	} else {
		res.status(404).json({ error: 'Passwords do not match' });
	}
};

exports.getUserRoles = async function (req, res, next) {
	res.status(200).json(Object.keys(Role));
};
