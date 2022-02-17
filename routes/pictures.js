const express = require('express');

const picturesController = require('../controllers/pictures');

const storage = require('../helpers/storage');

const router = express.Router();

router.get('/', picturesController.getPictures);

router.post('/', storage, picturesController.postPicture );
router.post('/:id', picturesController.updatePicture );

router.get('/:id', picturesController.getPicture );

router.delete('/:id', picturesController.deletePicture);

module.exports = router;