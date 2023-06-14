const { Router } = require("express");

const { check } = require("express-validator");
const validateFieds = require("../middlewares/validateFields");

const { uploadFile, updateFile, showImage, updateFileCloud } = require("../controllers/uploads.controller");
const { allowedCollection } = require("../helpers/db-validations");
const { validateFile } = require("../middlewares/validateFile");

const router = new Router();

router.get('/:collection/:id',
  [
    check('id', 'Id must be a valid mongo id').isMongoId(),
    check('collection').custom(c => allowedCollection(c, ['users', 'clothes'])),
    validateFieds
  ], showImage)

router.post('/', validateFile, uploadFile);

router.put('/:collection/:id', [
  check('id', 'Id must be a valid mongo id').isMongoId(),
  check('collection').custom(c => allowedCollection(c, ['users', 'clothes'])),
  validateFieds
], updateFileCloud);


module.exports = router