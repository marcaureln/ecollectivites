const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/user');

router.post('/', auth, userController.createUser);
router.get('/roles', userController.getUserRoles);
router.get('/:id', auth, userController.getUser);
router.get('/:id/requests', auth, userController.getUserRequests);
router.get('/:id/responses', auth, userController.getUserResponses);
router.post('/:id/update', auth, userController.updateUser);

module.exports = router;
