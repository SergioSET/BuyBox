import { Router } from 'express'
import { getUsuarios, getUsuario, createUsuario, deleteUsuario, updateUsuario, loginUsuario } from '../controllers/usuarios.js';


const router = Router()

router.get('/usuarios', getUsuarios)

router.get('/usuarios/:id', getUsuario)

router.post('/usuarios', createUsuario)

router.delete('/usuarios', deleteUsuario)

router.put('/usuarios', updateUsuario)

router.post('/login', loginUsuario)


export default router;