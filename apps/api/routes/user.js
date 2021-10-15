const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/', userController.verify);
router.post('/check', userController.check);
router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;
