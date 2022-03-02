const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

const requestController = require('../controllers/response');

router.post('/', auth, multer, requestController.makeResponse);
router.get('/:id', auth, requestController.getResponse);

module.exports = router;
