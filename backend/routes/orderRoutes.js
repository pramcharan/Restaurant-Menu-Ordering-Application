import express from 'express';
import {placeOrder, getOrderById, getOrdersByTable, getAllOrders, updateOrderStatus} from '../controllers/orderController.js';

const router = express.Router();

router.route('/')
  .post(placeOrder)
  .get(getAllOrders);

router.route('/:id')
  .get(getOrderById);

router.route('/:id/status')
    .patch(updateOrderStatus);

router.route('/table/:tableNumber')
  .get(getOrdersByTable);

export default router;