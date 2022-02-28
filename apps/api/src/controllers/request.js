const { PrismaClient } = require('@prisma/client');

/** @type { PrismaClient } **/
const prisma = require('../helpers/prisma').default;

exports.makeRequest = async function (req, res, next) {
	const { userId, reqType, reqContent, collectId } = JSON.parse(req.body.data);

	if (!userId || !reqType || !reqContent || !collectId) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	const requestType = await prisma.requestType.findUnique({ where: { reqTypeId: reqType } });

	if (!requestType) {
		return res.status(400).json({ error: 'Invalid request type' });
	}

	try {
		const reqAttachments = req.files.reduce((prev, current) => (prev += current.path + ';'), '');
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
	} catch (e) {
		res.status(500).send();
	}
};

exports.getRequest = async function (req, res, next) {
	const userId = req.auth.userId;
	const reqId = req.params.reqId;

	try {
		const user = await prisma.user.findUnique({ where: { userId: userId } });
		const request = await prisma.request.findUnique({ where: { reqId } });

		if (!request) {
			res.status(404).send();
		} else if (request.userId !== userId || !['ADMIN', 'AGENT'].includes(user.role)) {
			res.status(401).send();
		} else {
			res.status(200).json(request);
		}
	} catch {
		res.status(500).send();
	}
};

exports.getRequests = async function (req, res, next) {
	const userId = req.auth.userId;

	try {
		const requests = await prisma.request.findMany({
			where: {
				userId: userId,
			},
			orderBy: {
				reqCreatedAt: 'desc',
			},
		});

		res.status(200).json(requests);
	} catch {
		res.status(500).send();
	}
};

exports.requestTypes = async function (req, res, next) {
	try {
		const requestTypes = await prisma.requestType.findMany();
		res.status(200).json(requestTypes);
	} catch {
		res.status(500).send();
	}
};
