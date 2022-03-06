const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const collectiviteController = require('../controllers/collectivite');

router.post('/', auth, collectiviteController.createCollectivite);
router.get('/', collectiviteController.getAllCollectivites);
router.get('/communes', collectiviteController.getCommunes);
router.get('/regions', collectiviteController.getRegions);
router.get('/types', collectiviteController.getCollectivitesTypes);
router.get('/:id', collectiviteController.getCollectivite);
router.get('/:id/users', auth, collectiviteController.getCollectiviteUsers);
router.get('/:id/requests', auth, collectiviteController.getCollectiviteRequests);
router.post('/:id/update', auth, collectiviteController.updateCollectivite);

module.exports = router;
