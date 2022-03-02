const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/', userController.createUser);
router.get('/roles', userController.getUserRoles);
router.get('/:id', userController.getUser);
router.get('/:id/requests', userController.getUserRequests);
router.get('/:id/responses', userController.getUserResponses);
router.post('/:id/update', userController.updateUser);

module.exports = router;
