const { PrismaClient } = require('@prisma/client');
const { ac, isSameCollectivite } = require('../helpers/accesscontrol');
const { AppError } = require('../helpers/error');

/** @type { PrismaClient } **/
const prisma = require('../helpers/prisma').default;

exports.makeRequest = async function (req, res, next) {
	const { userId, reqType, reqContent, collectId } = JSON.parse(req.body.data);

	try {
		if (!userId || !reqType || !reqContent || !collectId) {
			throw AppError(400, 'Missing required fields');
		}

		const requestType = await prisma.requestType.findUnique({ where: { reqTypeId: reqType } });

		if (!requestType) {
			throw new AppError(404, 'Request type not found');
		}

		const reqAttachments = req.files.reduce((list, file) => (list += `${file.location};`), '');
		const inProgressStatus = await prisma.requestStatus.findFirst({ where: { reqStatusLabel: 'En cours' } });

		const request = await prisma.request.create({
			data: {
				reqContent,
				reqAttachments,
				reqTypeId: requestType.reqTypeId,
				reqStatusId: inProgressStatus.reqStatusId,
				collectId: collectId,
				userId: userId,
			},
		});

		res.status(201).json({ reqId: request.reqId, reqStatus: inProgressStatus.reqStatusLabel });
	} catch (error) {
		next(error);
	}
};

exports.getRequest = async function (req, res, next) {
	const userId = req.auth.userId;
	const reqId = req.params.reqId;

	try {
		const user = await prisma.user.findUnique({ where: { userId: userId } });
		const request = await prisma.request.findUnique({ where: { reqId } });

		if (!request) {
			throw new AppError(404, 'Request not found');
		}

		const isOwn = request.userId === user.userId || (await isSameCollectivite(user, request.userId));
		const permission = isOwn ? ac.can(req.auth.role).readOwn('request') : ac.can(req.auth.role).readAny('request');

		if (!permission.granted) {
			throw new AppError(403, 'Forbidden');
		}

		res.status(200).json(request);
	} catch (error) {
		next(error);
	}
};

exports.getRequestResponses = async function (req, res, next) {
	const userId = req.auth.userId;
	const reqId = req.params.reqId;

	try {
		const user = await prisma.user.findUnique({ where: { userId } });
		const request = await prisma.request.findUnique({ where: { reqId } });
		const responses = await prisma.response.findMany({ where: { reqId } });

		if (!request) {
			throw new AppError(404, 'Request not found');
		}

		const isOwn = request.userId === user.userId || (await isSameCollectivite(user, request.userId));
		const permission = isOwn ? ac.can(req.auth.role).readOwn('request') : ac.can(req.auth.role).readAny('request');

		if (!permission.granted) {
			throw new AppError(403, 'Forbidden');
		}

		res.status(200).json(responses);
	} catch (error) {
		next(error);
	}
};

exports.requestTypes = async function (req, res, next) {
	try {
		const requestTypes = await prisma.requestType.findMany();
		res.status(200).json(requestTypes);
	} catch (error) {
		next(error);
	}
};

exports.requestStatus = async function (req, res, next) {
	try {
		const requestStatus = await prisma.requestStatus.findMany();
		res.status(200).json(requestStatus);
	} catch (error) {
		next(error);
	}
};
