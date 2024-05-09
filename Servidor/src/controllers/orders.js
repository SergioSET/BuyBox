import { pool } from "../db.js"
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import bcrypt from 'bcrypt';

export const createOrder = async (req, res) => {
    const { userId, tracking, descripcion, direccionEntrega, costoTotal } = req.body;
    const shipping_date = new Date();
    shipping_date.setDate(shipping_date.getDate() + 7);
    const formatted_date = `${shipping_date.getDate().toString().padStart(2, '0')}/${(shipping_date.getMonth() + 1).toString().padStart(2, '0')}/${shipping_date.getFullYear()}`;
    const status = 'En proceso';

    try {
        const [rows] = await pool.query('INSERT INTO orden (id_usuario, tracking_number, description, status, shipping_date, shipping_address, cost) VALUES (?, ?, ?, ?, ?, ?, ?)', [userId, tracking, descripcion, status, formatted_date, direccionEntrega, costoTotal]);
        res.send({status: 'Orden creada'})
    } catch (error) {
        console.error('Error al crear orden:', error);
        res.status(500).send({ message: 'Error al crear orden' });
    }
}

export const indexOrder = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM orden WHERE id_usuario = ?', [req.params.id]);
        console.log(rows);
        res.send(rows);
    } catch (error) {
        console.error('Error al obtener ordenes:', error);
        res.status(500).send({ message: 'Error al obtener ordenes' });
    }
}