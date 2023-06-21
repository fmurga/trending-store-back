const { Router } = require('express');
const { check } = require('express-validator');
const validateFieds = require('../middlewares/validateFields');
const { ordersGet, ordersPut, ordersPost, ordersDelete } = require('../controllers/orders.controller');

const router = Router();
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     responses:
 *       '200':
 *         description: Successful response
 *   post:
 *     summary: Post link
 *     responses:
 *       '200':
 *         description: Successful response
 * /api/orders/:id:
 *   get:
 *     summary: Get order by id
 *     responses:
 *       '200':
 *         description: Successful response
 *   put:
 *     summary: Edit order with id
 *     responses:
 *       '200':
 *         description: Successful response
 *   delete:
 *     summary: Delete order with id
 *     responses:
 *       '200':
 *         description: Successful response
 */


router.get('/', ordersGet);

router.put('/:id',
  [
    check('id', 'This is not a valid id').isMongoId(),
    validateFieds
  ], ordersPut
);

router.post('/', [
  validateFieds
], ordersPost
);

router.delete('/', ordersDelete);

module.exports = router;