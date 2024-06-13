import { Router } from 'express'
import { createOrder, orderList, indexOrder, indexOrderById, updateOrder, deleteOrder } from '../controllers/orders.js';


const router = Router()

router.post('/order/create', createOrder)

router.get('/order/list/:id?', orderList)

// router.get('/order/index/:id?', indexOrder)
router.get('/order/index', indexOrder)

router.get('/order/indexId/:id?', indexOrderById)

router.put('/order/:id', updateOrder)

router.delete('/order/:id', deleteOrder)


export default router;