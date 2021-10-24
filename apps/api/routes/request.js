const express = require('express');
const router = express.Router();

const requestController = require('../controllers/request');

router.post('/', requestController.makeRequest);
router.get('/types', requestController.requestTypes);

module.exports = router;
