const { PrismaClient } = require('@prisma/client');

/** @type { PrismaClient } **/
const prisma = require('../helpers/prisma').default;

exports.makeResponse = async function (req, res, next) {
	const userId = req.auth.userId;
	const { resContent, reqId } = JSON.parse(req.body.data);

	if (!resContent || !reqId) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	try {
		const resAttachments = req.files.reduce((prev, current) => (prev += current.path + ';'), '');
		const request = await prisma.request.findUnique({ where: { reqId } });

		if (!request) {
			return res.status(404).json({ error: 'Request not found' });
		}

		const response = await prisma.response.create({
			data: {
				resContent,
				resAttachments,
				reqId,
				userId,
			},
		});

		res.status(201).json({ response });
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

exports.getResponse = async function (req, res, next) {
	const userId = req.auth.userId;
	const resId = req.params.id;

	if (!resId) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	try {
		const user = await prisma.user.findUnique({ where: { userId } });
		const response = await prisma.response.findUnique({ where: { resId } });

		if (!response) {
			res.status(404).send();
		} else if (response.userId !== userId || !['ADMIN', 'AGENT'].includes(user.role)) {
			res.status(403).send();
		} else {
			res.status(200).json(response);
		}
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};
