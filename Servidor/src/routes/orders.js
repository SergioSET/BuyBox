import { Router } from 'express'
import { createOrder, indexOrder, indexOrderByid } from '../controllers/orders.js';


const router = Router()

router.post ('/order/create', createOrder)

router.get('/order/index/', indexOrder)

router.get('/order/indexId/:id?', indexOrderByid)

export default router;