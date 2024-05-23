import { Router } from 'express'
import { getUsuarios, getUsuario, createUsuario, deleteUsuario, updateUsuario, loginUsuario, logoutUsuario } from '../controllers/usuarios.js';


const router = Router()

router.post ('/logout', logoutUsuario)

router.get('/usuarios', getUsuarios)

router.get('/usuarios/:id', getUsuario)

router.post('/usuarios', createUsuario)

router.delete('/usuarios/:id', deleteUsuario)

router.put('/usuarios/:id', updateUsuario)

router.post('/login', loginUsuario)


export default router;