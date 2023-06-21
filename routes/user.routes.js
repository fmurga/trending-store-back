const { Router } = require('express');
const { check } = require('express-validator');

const { usersGet, usersDelete, usersPost, usersPut } = require('../controllers/users.controller');

const validateFieds = require('../middlewares/validateFields');
const { validateRole, existsEmail, existsUserById } = require('../helpers/db-validations');
const validateJwt = require('../middlewares/validateJwt');

const router = Router();
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all users
 *     responses:
 *       '200':
 *         description: Successful response
 *   post:
 *     summary: Post user
 *     responses:
 *       '200':
 *         description: Successful response
 * /api/users/:id:
 *   get:
 *     summary: Get user by id
 *     responses:
 *       '200':
 *         description: Successful response
 *   put:
 *     summary: Edit user with id
 *     responses:
 *       '200':
 *         description: Successful response
 *   delete:
 *     summary: Delete user with id
 *     responses:
 *       '200':
 *         description: Successful response
 */

router.get('/', usersGet);

router.put('/:id',
  [
    check('id', 'This is not a valid id').isMongoId(),
    check('id').custom(existsUserById),
    check('role').custom(validateRole),
  ],
  usersPut);

router.post('/',
  [
    check('email', 'This is not a valid email address').isEmail(),
    check('email', 'The email is required').not().isEmpty(),
    check('password', 'The password is to short').isLength({ min: 6 }),
    check('password', 'The password must be alphanumeric').not().isAlphanumeric(),
    check('password', 'The password is required').not().isEmpty(),
    check('name', 'The name is required').not().isEmpty(),
    // check('role', 'The user role is not permited').isIn(['admin', 'user']),
    check('role').custom(validateRole),
    check('email').custom(existsEmail),
    validateFieds
  ],
  usersPost);

router.delete('/:id',
  [
    validateJwt,
    check('id', 'This is not a valid id').isMongoId(),
    check('id').custom(existsUserById),
    validateFieds
  ]
  , usersDelete);

module.exports = router;