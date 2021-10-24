const express = require('express');
const router = express.Router();

const requestController = require('../controllers/request');

router.post('/', requestController.makeRequest);
router.get('/', requestController.getRequests);
router.get('/types', requestController.requestTypes);
router.get('/:numReq', requestController.getRequest);

module.exports = router;
