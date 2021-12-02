const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/verify/verification', userController.verify);
router.post('/verify/verification-check', userController.check);
router.post('/users/signup', userController.signup);
router.post('/users/login', userController.login);

module.exports = router;
