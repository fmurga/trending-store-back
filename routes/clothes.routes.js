const { Router } = require('express');
const { clothesGet, clothesDelete, clothesPost, clothesPut } = require('../controllers/clothes.controller');
const { check } = require('express-validator');
const { validateCategory, existsCloheById } = require('../helpers/clothes-validations');
const validateFieds = require('../middlewares/validateFields');

const router = Router();


router.get('/', clothesGet);

router.put('/:id',
  [
    check('id', 'This is not a valid id').isMongoId(),
    check('id').custom(existsCloheById),
    check('category').custom(validateCategory),
    validateFieds
  ],
  clothesPut);

router.post('/', [
  check('stock', 'The stock is required').not().isEmpty(),
  check('name', 'The name is required').not().isEmpty(),
  check('initial', 'The initial stock is required').not().isEmpty(),
  check('size', 'The size is required').not().isEmpty(),
  check('category').custom(validateCategory),
  validateFieds
],
  clothesPost);

router.delete('/', clothesDelete);

module.exports = router;