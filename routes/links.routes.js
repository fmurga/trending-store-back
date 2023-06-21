const { Router } = require('express');
const { check } = require('express-validator');

const { linksGet, linksDelete, linksPost, linksPut } = require('../controllers/links.controller');

const validateFieds = require('../middlewares/validateFields');
const { existsLinkById } = require('../helpers/db-validations');

const router = Router();
/**
 * @swagger
 * /api/links:
 *   get:
 *     summary: Get all links
 *     responses:
 *       '200':
 *         description: Successful response
 *   post:
 *     summary: Post link
 *     responses:
 *       '200':
 *         description: Successful response
 * /api/links/:id:
 *   get:
 *     summary: Get link by id
 *     responses:
 *       '200':
 *         description: Successful response
 *   put:
 *     summary: Edit link with id
 *     responses:
 *       '200':
 *         description: Successful response
 *   delete:
 *     summary: Delete link with id
 *     responses:
 *       '200':
 *         description: Successful response
 */

router.get('/', linksGet);

router.put('/:id',
  [
    check('id', 'This is not a valid id').isMongoId(),
  ],
  linksPut);

router.post('/',
  [
    check('name', 'The name is required').not().isEmpty(),
    check('path', 'The path is required').not().isEmpty(),
    validateFieds
  ],
  linksPost);

router.delete('/:id',
  [
    check('id', 'This is not a valid id').isMongoId(),
    check('id').custom(existsLinkById),
    validateFieds
  ]
  , linksDelete);

module.exports = router;