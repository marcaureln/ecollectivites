const express = require('express');
const router = express.Router();

const collectiviteController = require('../controllers/collectivite');

router.get('/', collectiviteController.getAll);
router.get('/commune', collectiviteController.getCommunes);
router.get('/region', collectiviteController.getRegions);
router.get('/:id', collectiviteController.getCollectivite);

module.exports = router;
