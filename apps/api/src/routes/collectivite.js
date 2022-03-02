const express = require('express');
const router = express.Router();

const collectiviteController = require('../controllers/collectivite');

router.post('/', collectiviteController.createCollectivite);
router.get('/', collectiviteController.getAllCollectivites);
router.get('/communes', collectiviteController.getCommunes);
router.get('/regions', collectiviteController.getRegions);
router.get('/types', collectiviteController.getCollectivitesTypes);
router.get('/:id', collectiviteController.getCollectivite);
router.get('/:id/users', collectiviteController.getCollectiviteUsers);
router.get('/:id/requests', collectiviteController.getCollectiviteRequests);
router.post('/:id/update', collectiviteController.updateCollectivite);

module.exports = router;
