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
        res.send({ status: 'Orden creada' })
    } catch (error) {
        console.error('Error al crear orden:', error);
        res.status(500).send({ message: 'Error al crear orden' });
    }
}

export const orderList = async (req, res) => {
    try {
        const { id } = req.params;
        const query = `SELECT * FROM orden WHERE id_usuario = ?`;
        const [rows] = await pool.query(query, [id]);
        res.send(rows);
    } catch (error) {
        console.error('Error al obtener ordenes:', error);
        res.status(500).send({ message: 'Error al obtener ordenes' });
    }
}


export const indexOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.query;
        let query = `
            SELECT 
                orden.id AS orderId, name, tracking_number, description, status, shipping_date, shipping_address, cost, 
                orden.created_at AS ordenCreated, orden.updated_at AS ordenUpdated, 
                orden.id_usuario AS IdUsuario 
            FROM orden 
            INNER JOIN usuario ON orden.id_usuario = usuario.id
        `;
        const params = [];

        // Si hay un id en los parámetros, se busca por nombre usando LIKE
        if (id) {
            query += ' WHERE name LIKE ?';
            params.push(`${id}%`);

            // Si también hay un filtro de estado, se agrega a la consulta
            if (status) {
                query += ' AND status = ?';
                console.log(status)
                params.push(status);
            }
        } else if (status) {
            // Si no hay id pero hay un filtro de estado, se agrega la condición de estado
            query += ' WHERE status = ?';
            params.push(status);
        }

        const [rows] = await pool.query(query, params);
        res.send(rows);
    } catch (error) {
        console.error('Error al obtener ordenes:', error);
        res.status(500).send({ message: 'Error al obtener ordenes' });
    }
}

export const indexOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        let query = `
            SELECT 
                orden.id AS orderId, name, tracking_number, description, status, shipping_date, shipping_address, cost, 
                orden.created_at AS ordenCreated, orden.updated_at AS ordenUpdated, 
                orden.id_usuario AS IdUsuario 
            FROM orden 
            INNER JOIN usuario ON orden.id_usuario = usuario.id
        `;
        const params = [];

        // Si hay un id en los parámetros, se busca por nombre usando LIKE
        if (id) {
            query += ' WHERE orden.id = ?';
            params.push(`${id}`);
        }
        const [rows] = await pool.query(query, params);
        res.send(rows);
    } catch (error) {
        console.error('Error al obtener ordenes:', error);
        res.status(500).send({ message: 'Error al obtener ordenes' });
    }
}


export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { shipping_address, status } = req.body;

    try {
        const query = 'UPDATE orden SET shipping_address = ?, status = ? WHERE id = ?';
        const [result] = await pool.query(query, [shipping_address, status, id]);

        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'Orden no encontrada' });
            return;
        }

        res.send({ status: 'Orden actualizada' });
    } catch (error) {
        console.error('Error al actualizar la orden:', error);
        res.status(500).send({ message: 'Error al actualizar la orden' });
    }
};

export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM orden WHERE id = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'Orden no encontrada' });
            return;
        }

        res.send({ status: 'Orden eliminada' });
    } catch (error) {
        console.error('Error al eliminar la orden:', error);
        res.status(500).send({ message: 'Error al eliminar la orden' });
    }
};