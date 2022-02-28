const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const verificationController = require('../controllers/verify');

router.post('/login', authController.login);
router.post('/verify/verification', verificationController.verify);
router.post('/verify/verification-check', verificationController.check);
router.post('/signup', authController.signup);

module.exports = router;
