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

export const updateUsuario = (req, res) => res.send('Actualizando usuario')

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
            user: name
        },'secret')

        const serialized = serialize('myTokenName', token, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/'
        })
        res.setHeader('Set-Cookie',serialized)
        return res.json('login succesfully')
        res.send({ message: 'Inicio de sesión exitoso' });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send({ message: 'Error al iniciar sesión' });
    }
};

