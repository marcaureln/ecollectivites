const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');

const requestController = require('../controllers/request');

const { userAuth } = require('../middleware/auth');

// router.post('/', userAuth, multer, requestController.makeRequest);
router.post('/', multer, requestController.makeRequest);
router.get('/', userAuth, requestController.getRequests);
router.get('/types', requestController.requestTypes);
router.get('/:numreq', userAuth, requestController.getRequest);

module.exports = router;
