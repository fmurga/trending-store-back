const { Router } = require('express');
const { clothesGet, clothesDelete, clothesPost, clothesPut, getClotheById } = require('../controllers/clothes.controller');
const { check } = require('express-validator');
const validateFieds = require('../middlewares/validateFields');
const { existsCategoryById, checkCategoryName, existsCloheById } = require('../helpers/db-validations');

const router = Router();


router.get('/', clothesGet);
// Obtener una categoria por id - publico
router.get('/:id', [
  check('id', 'This is not a valid id').isMongoId(),
  check('id').custom(existsCloheById),
  validateFieds,
], getClotheById);

router.put('/:id',
  [
    check('id', 'This is not a valid id').isMongoId(),
    check('id').custom(existsCloheById),
    check('category').custom(existsCategoryById),
    validateFieds
  ],
  clothesPut);

router.post('/', [
  check('stock', 'The stock is required').not().isEmpty(),
  check('name', 'The name is required').not().isEmpty(),
  check('initial', 'The initial stock is required').not().isEmpty(),
  check('category', 'The category is not valid').isString(),
  check('category').custom(checkCategoryName),
  check('sizes', 'The size is required').not().isEmpty(),
  validateFieds
],
  clothesPost);

router.delete('/', clothesDelete);

module.exports = router;