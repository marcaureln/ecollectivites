const express = require('express');
const router = express.Router();

const agentController = require('../controllers/agent');

router.post('/auth/login', agentController.login);
router.post('/auth/set-password', agentController.setPassword);
router.post('/messages', agentController.sendMessage);
router.post('/penpals', agentController.getPenPals);
router.post('/conversations', agentController.getConversation);
// router.get('/contacts', agentController.getCollectivitesAgents);
router.get('/contacts/search', agentController.searchAgent);
router.get('/contacts/:num', agentController.getAgentInfo);
// router.get('/inbox', agentController.getCollectivitesRequests);

module.exports = router;
