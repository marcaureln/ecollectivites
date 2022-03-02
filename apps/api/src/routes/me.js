const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userController = require('../controllers/user');

router.get('/', auth, userController.getUser);
router.get('/requests', auth, userController.getUserRequests);
router.get('/responses', auth, userController.getUserResponses);
router.post('/update', auth, userController.updateUser);
router.post('/change-password', userController.changePassword);

module.exports = router;
