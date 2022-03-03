const { PrismaClient } = require('@prisma/client');
const { AppError } = require('../helpers/error');

/** @type { PrismaClient } **/
const prisma = require('../helpers/prisma').default;

exports.getCollectivitesTypes = async function (req, res, next) {
	try {
		const types = await prisma.collectiviteType.findMany();
		res.status(200).json(types);
	} catch (error) {
		next(error);
	}
};

exports.getAllCollectivites = async function (req, res, next) {
	try {
		const collectivites = await prisma.collectivite.findMany();
		res.status(200).json(collectivites);
	} catch (error) {
		next(error);
	}
};

exports.getCommunes = async function (req, res, next) {
	try {
		const communes = await prisma.collectivite.findMany({
			where: {
				collectType: {
					collectTypeLabel: 'Commune',
				},
			},
			orderBy: {
				collectId: 'asc',
			},
		});

		res.status(200).json(communes);
	} catch (error) {
		next(error);
	}
};

exports.getRegions = async function (req, res, next) {
	try {
		const regions = await prisma.collectivite.findMany({
			where: {
				collectType: {
					collectTypeLabel: 'Région',
				},
			},
			orderBy: {
				collectId: 'asc',
			},
		});

		res.status(200).json(regions);
	} catch (error) {
		next(error);
	}
};

exports.getCollectivite = async function (req, res, next) {
	const collectId = parseInt(req.params.id);

	try {
		if (!collectId) {
			throw new AppError(400, 'Missing Collectivite ID');
		}

		const collectivite = await prisma.collectivite.findUnique({ where: { collectId } });

		if (!collectivite) {
			throw new AppError(404, 'Collectivite not found');
		} else {
			res.status(200).json(collectivite);
		}
	} catch (error) {
		next(error);
	}
};

exports.getCollectiviteUsers = async function (req, res, next) {
	const collectId = parseInt(req.params.id);

	try {
		if (!collectId) {
			throw new AppError(400, 'Missing Collectivite ID');
		}

		const collectivite = await prisma.collectivite.findUnique({ where: { collectId } });

		if (!collectivite) {
			throw new AppError(404, 'Collectivite not found');
		} else {
			const users = await prisma.user.findMany({ where: { collectId } });
			res.status(200).json(users);
		}
	} catch (error) {
		next(error);
	}
};

exports.getCollectiviteRequests = async function (req, res, next) {
	const collectId = parseInt(req.params.id);

	try {
		if (!collectId) {
			throw new AppError(400, 'Missing Collectivite ID');
		}

		const collectivite = await prisma.collectivite.findUnique({ where: { collectId } });

		if (!collectivite) {
			throw new AppError(404, 'Collectivite not found');
		} else {
			const requests = await prisma.request.findMany({ where: { collectId } });
			res.status(200).json(requests);
		}
	} catch (error) {
		next(error);
	}
};

exports.createCollectivite = async function (req, res, next) {
	const { collectName, collectTypeId } = req.body;

	try {
		if (!collectName || !collectTypeId) {
			throw new AppError(400, 'Missing required fields');
		}

		const collectivite = await prisma.collectivite.create({
			data: { collectName, collectTypeId },
		});

		res.status(201).json(collectivite);
	} catch (error) {
		next(error);
	}
};

exports.updateCollectivite = async function (req, res, next) {
	const collectId = parseInt(req.params.id);
	const { collectName, collectTypeId } = req.body;

	try {
		if (!collectId || !collectName || !collectTypeId) {
			throw new AppError(400, 'Missing required fields');
		}

		const collectivite = await prisma.collectivite.findUnique({ where: { collectId } });

		if (!collectivite) {
			throw new AppError(404, 'Collectivite not found');
		}

		const updatedCollectivite = await prisma.collectivite.update({
			where: { collectId },
			data: { collectName, collectTypeId },
		});

		res.status(200).json(updatedCollectivite);
	} catch (error) {
		next(error);
	}
};
