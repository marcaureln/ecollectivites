const { PrismaClient } = require('@prisma/client');

/** @type { PrismaClient } **/
const prisma = require('../helpers/prisma').default;

exports.getCollectivitesTypes = async function (req, res, next) {
	try {
		const types = await prisma.collectiviteType.findMany();
		res.status(200).json(types);
	} catch (error) {
		res.status(500).send();
	}
};

exports.getAllCollectivites = async function (req, res, next) {
	const collectivites = await prisma.collectivite.findMany();
	res.status(200).json(collectivites);
};

exports.getCommunes = async function (req, res, next) {
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
};

exports.getRegions = async function (req, res, next) {
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
};

exports.getCollectivite = async function (req, res, next) {
	const collectId = parseInt(req.params.id);

	if (!collectId) {
		return res.status(400).send();
	}

	try {
		const collectivite = await prisma.collectivite.findUnique({ where: { collectId } });

		if (!collectivite) {
			res.status(404).send();
		} else {
			res.status(200).json(collectivite);
		}
	} catch (error) {
		res.status(500).send();
	}
};

exports.getCollectiviteUsers = async function (req, res, next) {
	const collectId = parseInt(req.params.id);

	if (!collectId) {
		return res.status(400).send();
	}

	try {
		const collectivite = await prisma.collectivite.findUnique({ where: { collectId } });

		if (!collectivite) {
			res.status(404).send();
		} else {
			const users = await prisma.user.findMany({ where: { collectId } });
			res.status(200).json(users);
		}
	} catch (error) {
		res.status(500).send();
	}
};

exports.getCollectiviteRequests = async function (req, res, next) {
	const collectId = parseInt(req.params.id);

	if (!collectId) {
		return res.status(400).send();
	}

	try {
		const collectivite = await prisma.collectivite.findUnique({ where: { collectId } });

		if (!collectivite) {
			res.status(404).send();
		} else {
			const requests = await prisma.request.findMany({ where: { collectId } });
			res.status(200).json(requests);
		}
	} catch (error) {
		res.status(500).send();
	}
};

exports.createCollectivite = async function (req, res, next) {
	const { collectName, collectTypeId } = req.body;

	if (!collectName || !collectTypeId) {
		return res.status(400).send();
	}

	try {
		const collectivite = await prisma.collectivite.create({
			data: { collectName, collectTypeId },
		});

		res.status(201).json(collectivite);
	} catch (error) {
		res.status(500).send();
	}
};

exports.updateCollectivite = async function (req, res, next) {
	const collectId = parseInt(req.params.id);
	const { collectName, collectTypeId } = req.body;

	if (!collectId || !collectName || !collectTypeId) {
		return res.status(400).send();
	}

	try {
		const collectivite = await prisma.collectivite.findUnique({ where: { collectId } });

		if (!collectivite) {
			res.status(404).send();
		}

		const updatedCollectivite = await prisma.collectivite.update({
			where: { collectId },
			data: { collectName, collectTypeId },
		});

		res.status(200).json(updatedCollectivite);
	} catch (error) {
		res.status(500).send();
	}
};
