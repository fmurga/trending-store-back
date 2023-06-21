const { Router } = require('express');
const { check } = require('express-validator');

const { categorysGet, categorysDelete, categorysPost, categorysPut } = require('../controllers/categorys.controller');

const validateFieds = require('../middlewares/validateFields');
const { existsCategoryById, existsCategoryByName } = require('../helpers/db-validations');

const router = Router();

/**
 * @swagger
 * /api/categorys:
 *   get:
 *     summary: Get all categories
 *     responses:
 *       '200':
 *         description: Successful response
 *   post:
 *     summary: Post category
 *     responses:
 *       '200':
 *         description: Successful response
 * /api/categorys/:id:
 *   get:
 *     summary: Get category by id
 *     responses:
 *       '200':
 *         description: Successful response
 *   put:
 *     summary: Edit category with id
 *     responses:
 *       '200':
 *         description: Successful response
 *   delete:
 *     summary: Delete category with id
 *     responses:
 *       '200':
 *         description: Successful response
 */

router.get('/', categorysGet);

router.put('/:id',
  [
    check('id', 'This is not a valid id').isMongoId(),
  ],
  categorysPut);

router.post('/',
  [
    check('name', 'The name is required').not().isEmpty(),
    check('name').custom(existsCategoryByName),
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