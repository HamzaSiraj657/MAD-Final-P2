const express = require('express');
const router = express.Router();
const {createOrder,getOrders,updateOrderStatus,deleteOrder} = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/', getOrders);
router.put('/status/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;
