import { Router } from 'express'
import { createOrder, indexOrder, indexOrderById, updateOrder } from '../controllers/orders.js';


const router = Router()

router.post ('/order/create', createOrder)

router.get('/order/index/:id?', indexOrder)

router.get('/order/indexId/:id?', indexOrderById)

router.put('/order/:id', updateOrder)


export default router;