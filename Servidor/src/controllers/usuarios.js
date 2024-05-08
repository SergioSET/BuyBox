import { pool } from "../db.js"
import jwt from 'jsonwebtoken'
import {serialize} from 'cookie'
import bcrypt from 'bcrypt';


export const getUsuarios = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM  usuario')
    res.json(rows)
}

export const getUsuario = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM  usuario WHERE id = ?', [req.params.id])
    res.json(rows[0])
} 

export const createUsuario = async (req, res) => {
    const { name, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const [existingUsers] = await pool.query('SELECT id FROM usuario WHERE name = ?', [name]);

        // Si ya existe un usuario con ese nombre, enviar un código de error
        if (existingUsers.length > 0) {
            return res.status(400).send({ message: 'El usuario ya existe' });
        }

        // Si el usuario no existe, continuar con la creación
        const hashedPassword = await bcrypt.hash(password, 10);

        const [rows] = await pool.query('INSERT INTO usuario (name, password) VALUES (?, ?)', [name, hashedPassword]);

        res.send({
            id: rows.insertId,
            name,
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).send({ message: 'Error al crear usuario' });
    }
};


export const deleteUsuario = (req, res) => res.send('Eliminando usuario')

export const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { name, password, direccion, email } = req.body;

    try {
        // Verificar si el usuario existe
        const [existingUsers] = await pool.query('SELECT id FROM usuario WHERE id = ?', [id]);

        // Si no existe un usuario con ese ID, enviar un código de error
        if (existingUsers.length === 0) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        // Si el usuario existe, actualizar sus datos
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query('UPDATE usuario SET name = ?, password = ?, direccion = ?, email=? WHERE id = ?', [name, hashedPassword,direccion,email, id]);

        res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).send({ message: 'Error al actualizar usuario' });
    }
};


export const loginUsuario = async (req, res) => {
    const { name, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM usuario WHERE name = ?', [name]);

        if (rows.length === 0) {
            return res.status(400).send({ message: 'Usuario no encontrado' });
        }

        const user = rows[0];
        

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Contraseña incorrecta' });
        }
        
        const token = jwt.sign({
            exp: Math.floor(Date.now()/1000) + 60 * 60 * 24 * 30,
            user: user.id
        },'secret')

        const serialized = serialize('myTokenName', token, {
            httpOnly: false,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/'
        })

       
        return res.json({ message: 'login successfully', token: serialized });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send({ message: 'Error al iniciar sesión' });
    }
}

export const logoutUsuario = async (req, res) => {
    try {
      res.clearCookie('myTokenName');
      return res.json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      res.status(500).send({ message: 'Error al cerrar sesión' });
    }
  };

