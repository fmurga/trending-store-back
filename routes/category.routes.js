const { Router } = require('express');
const { check } = require('express-validator');

const { categorysGet, categorysDelete, categorysPost, categorysPut } = require('../controllers/categorys.controller');

const validateFieds = require('../middlewares/validateFields');
const { existsCategoryById, existsCategory } = require('../helpers/db-validations');

const router = Router();


router.get('/', categorysGet);

router.put('/:id',
  [
    check('id', 'This is not a valid id').isMongoId(),
  ],
  categorysPut);

router.post('/',
  [
    check('name', 'The name is required').not().isEmpty(),
    check('name').custom(existsCategory),
    validateFieds
  ],
  categorysPost);

router.delete('/:id',
  [
    check('id', 'This is not a valid id').isMongoId(),
    check('id').custom(existsCategoryById),
    validateFieds
  ]
  , categorysDelete);

module.exports = router;