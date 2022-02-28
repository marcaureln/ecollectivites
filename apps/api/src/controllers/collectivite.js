const { PrismaClient } = require('@prisma/client');

/** @type { PrismaClient } **/
const prisma = require('../helpers/prisma').default;

exports.getCollectivite = async function (req, res, next) {
	const collect_id = parseInt(req.params.id);

	if (!collect_id) {
		return res.status(400).send();
	}

	const collectivite = await prisma.collectivite.findUnique({
		where: {
			collectId: collect_id,
		},
	});

	if (!collectivite) {
		return res.status(404).send();
	}

	res.status(200).json(collectivite);
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

exports.getAll = async function (req, res, next) {
	const collectivites = await prisma.collectivite.findMany();

	res.status(200).json(collectivites);
};
