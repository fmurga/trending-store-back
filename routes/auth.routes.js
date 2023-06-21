const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
const validateFieds = require("../middlewares/validateFields");
const validateJwt = require("../middlewares/validateJwt");

const router = new Router();
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Post login credentials
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 */
router.post('/login',
  [
    validateJwt,
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFieds
  ]
  , login)

module.exports = router;