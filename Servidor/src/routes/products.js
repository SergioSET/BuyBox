import { Router } from 'express'
import { createProduct, productList, indexProduct, updateProduct, deleteProduct } from '../controllers/products.js';


const router = Router()

router.post('/product/create', createProduct)
router.get('/product', productList)
router.get('/product/:id', indexProduct)
router.put('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)

export default router;