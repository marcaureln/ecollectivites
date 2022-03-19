const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

const authController = require('../controllers/auth');
const verificationController = require('../controllers/verify');
const collectiviteController = require('../controllers/collectivite');
const requestController = require('../controllers/request');
const responseController = require('../controllers/response');
const userController = require('../controllers/user');

// Authentication related routes
router.post('/auth/login', authController.login);
router.post('/auth/verify/verification', verificationController.verify);
router.post('/auth/verify/verification-check', verificationController.check);
router.post('/auth/signup', authController.signup);

// Collectivites related routes
router.post('/collectivites', auth, collectiviteController.createCollectivite);
router.get('/collectivites', collectiviteController.getAllCollectivites);
router.get('/collectivites/communes', collectiviteController.getCommunes);
router.get('/collectivites/regions', collectiviteController.getRegions);
router.get('/collectivites/types', collectiviteController.getCollectivitesTypes);
router.get('/collectivites/:id', collectiviteController.getCollectivite);
router.get('/collectivites/:id/users', auth, collectiviteController.getCollectiviteUsers);
router.get('/collectivites/:id/requests', auth, collectiviteController.getCollectiviteRequests);
router.post('/collectivites/:id/update', auth, collectiviteController.updateCollectivite);

// Requests routes
router.post('/requests', auth, multer, requestController.makeRequest);
router.get('/requests/types', requestController.requestTypes);
router.get('/requests/status', requestController.requestStatus);
router.get('/requests/:reqId', auth, requestController.getRequest);
router.get('/requests/:reqId/responses', auth, requestController.getRequestResponses);

// Responses routes
router.post('/responses', auth, multer, responseController.makeResponse);
router.get('/responses/:id', auth, responseController.getResponse);

// Users related routes
router.post('/users', auth, userController.createUser);
router.get('/users/roles', userController.getUserRoles);
router.get('/users/:id', auth, userController.getUser);
router.get('/users/:id/requests', auth, userController.getUserRequests);
router.get('/users/:id/responses', auth, userController.getUserResponses);
router.post('/users/:id/update', auth, userController.updateUser);

// Currently connected user routes
router.get('/me', auth, addUserIdParam, userController.getUser);
router.get('/me/requests', auth, addUserIdParam, userController.getUserRequests);
router.get('/me/responses', auth, addUserIdParam, userController.getUserResponses);
router.post('/me/update', auth, addUserIdParam, userController.updateUser);
router.post('/me/change-password', userController.changePassword);

function addUserIdParam(req, res, next) {
	// Mimic /api/users/:id
	req.params.id = req.auth.userId;
	next();
}

module.exports = router;
