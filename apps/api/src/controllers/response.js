const { PrismaClient } = require('@prisma/client');
const { ac } = require('../helpers/accesscontrol');
const { AppError } = require('../helpers/error');

/** @type { PrismaClient } **/
const prisma = require('../helpers/prisma').default;

exports.makeResponse = async function (req, res, next) {
	const userId = req.auth.userId;
	const { resContent, reqId } = JSON.parse(req.body.data);

	try {
		if (!resContent || !reqId) {
			throw new AppError(400, 'Missing required fields');
		}

		const resAttachments = req.files.reduce((list, file) => (list += `${file.location};`), '');
		const request = await prisma.request.findUnique({ where: { reqId } });

		if (!request) {
			throw new AppError(404, 'Request not found');
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
		next(error);
	}
};

exports.getResponse = async function (req, res, next) {
	const userId = req.auth.userId;
	const resId = req.params.id;

	try {
		if (!resId) {
			throw AppError(400, 'Missing required fields');
		}

		const user = await prisma.user.findUnique({ where: { userId } });
		const response = await prisma.response.findUnique({ where: { resId } });

		if (!response) {
			throw new AppError(404, 'Response not found');
		}

		const isOwn = response.userId === user.userId || (await isSameCollectivite(user, response.userId));
		const permission = isOwn ? ac.can(req.auth.role).readOwn('response') : ac.can(req.auth.role).readAny('response');

		if (!permission.granted) {
			throw new AppError(403, 'Forbidden');
		}

		res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
