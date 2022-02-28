const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

const requestController = require('../controllers/request');

router.post('/', auth, multer, requestController.makeRequest);
router.get('/', auth, requestController.getRequests);
router.get('/types', requestController.requestTypes);
router.get('/:reqId', auth, requestController.getRequest);

module.exports = router;
