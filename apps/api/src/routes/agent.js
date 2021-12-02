const express = require('express');
const router = express.Router();

const agentController = require('../controllers/agent');

router.post('/auth/login', agentController.login);
router.post('/auth/set-password', agentController.setPassword);

module.exports = router;
