const AccessControl = require('accesscontrol');
const { AppError } = require('./error');
const prisma = require('../helpers/prisma').default;
const ac = new AccessControl();

ac.grant('USER')
	.readAny('collectivite')
	.readOwn('request')
	.createOwn('request')
	.readOwn('response')
	.createOwn('response')
	.readOwn('account', ['*', '!password'])
	.updateOwn('account', ['*', '!role']);

ac.grant('AGENT')
	.extend('USER')
	.updateOwn('account', ['!collectId', '!role'])
	.readAny('request')
	.readAny('response')
	.readAny('account');

ac.grant('ADMIN').extend(['AGENT']).createOwn('account').updateOwn('account', ['*']).updateOwn('collectivite');

// console.log(ac.getGrants());

/**
 * Check wether the two users are from the same collectivite
 * @param {(string|Object)} user1 - Provide a userId or a user object
 * @param {(string|Object)} user2 - Provide a userId or a user object
 * @returns {Promise.<boolean>} user1.collectId === user2.collectId
 */
async function isSameCollectivite(user1, user2) {
	try {
		if (typeof user1 === 'string') {
			user1 = await prisma.user.findUnique({ where: { userId: user1 } });
			if (!user1) {
				throw new AppError(404, 'User not found');
			}
		}

		if (typeof user2 === 'string') {
			user2 = await prisma.user.findUnique({ where: { userId: user2 } });
			if (!user2) {
				throw new AppError(404, 'User not found');
			}
		}
	} catch (error) {
		throw error;
	}

	return user1.collectId === user2.collectId;
}

/**
 *
 * @param {(string|Object)} user - Provide a userId or a user object
 * @param {(string|Object)} collect - Provide a collectId or a collectivite object
 * @returns {Promise.<boolean>} user.collectId === collect.collectId
 */
async function belongsToCollectivite(user, collect) {
	try {
		if (typeof user === 'string') {
			user = await prisma.user.findUnique({ where: { userId: user } });
			if (!user) {
				throw new AppError(404, 'User not found');
			}
		}
	} catch (error) {
		throw error;
	}

	if (typeof collect === 'object') {
		return user.collectId === collect.collectId;
	}

	return user.collectId === collect;
}

module.exports = { ac, isSameCollectivite, belongsToCollectivite };
