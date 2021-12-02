const express = require('express');
const router = express.Router();

const collectiviteController = require('../controllers/collectivite');

router.get('/', collectiviteController.getAll);
router.get('/communes', collectiviteController.getCommunes);
router.get('/regions', collectiviteController.getRegions);
router.get('/:id', collectiviteController.getCollectivite);

module.exports = router;
