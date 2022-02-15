const express = require('express');

const picturesController = require('../controllers/pictures');

const storage = require('../helpers/storage');

const router = express.Router();

router.get('/', picturesController.getPictures);

router.post('/', storage, picturesController.postProfile);

router.delete('/:id', picturesController.deletePicture)

module.exports = router;