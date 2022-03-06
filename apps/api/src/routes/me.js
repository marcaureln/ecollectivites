const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/user');

router.get('/', auth, addParams, userController.getUser);
router.get('/requests', auth, addParams, userController.getUserRequests);
router.get('/responses', auth, addParams, userController.getUserResponses);
router.post('/update', auth, addParams, userController.updateUser);
router.post('/change-password', userController.changePassword);

function addParams(req, res, next) {
	// Mimic /api/users/:id
	req.params.id = req.auth.userId;
	next();
}

module.exports = router;
