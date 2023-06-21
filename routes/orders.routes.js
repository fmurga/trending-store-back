const { Router } = require('express');
const { check } = require('express-validator');
const validateFieds = require('../middlewares/validateFields');
const { ordersGet, ordersPut, ordersPost, ordersDelete } = require('../controllers/orders.controller');
const router = Router();


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