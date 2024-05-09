import { Router } from 'express'
import { createOrder, indexOrder } from '../controllers/orders.js';


const router = Router()

router.post ('/order/create', createOrder)

router.get('/order/index/:id', indexOrder)

export default router;