import { Router } from 'express'
import { getTotalCart, getCarritoPersona, addCart, deleteProdCart,updateUsuario } from '../controllers/carrito.js';


const router = Router()


router.get('/carritos', getTotalCart)

router.get('/carrito/:id', getCarritoPersona)

router.post('/carrito', addCart)

router.delete('/carrito/:id', deleteProdCart)

router.put('/carrito/:id', updateUsuario)



export default router;