const { PrismaClient } = require('@prisma/client');
const { COMMUNES, REGIONS } = require('./liste-communes-et-regions');
const { REQUEST_TYPES, REQUEST_STATUS } = require('./request-types-and-status');

const prisma = new PrismaClient();

async function loadFixtures() {
	console.log('Loading fixtures...');

	const communeType = await prisma.collectiviteType.create({ data: { collectTypeLabel: 'Commune' } });

	const regionType = await prisma.collectiviteType.create({ data: { collectTypeLabel: 'Région' } });

	await prisma.collectivite.createMany({
		data: COMMUNES.map((name) => ({ collectName: name, collectTypeId: communeType.collectTypeId })),
	});

	await prisma.collectivite.createMany({
		data: REGIONS.map((name) => ({ collectName: name, collectTypeId: regionType.collectTypeId })),
	});

	await prisma.requestType.createMany({
		data: REQUEST_TYPES.map((requestType) => ({ reqTypeLabel: requestType })),
	});

	await prisma.requestStatus.createMany({
		data: REQUEST_STATUS.map((requestStatus) => ({ reqStatusLabel: requestStatus })),
	});
}

loadFixtures()
	.then((_) => {
		console.log('✔ Fixtures loaded successfully!');
	})
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
