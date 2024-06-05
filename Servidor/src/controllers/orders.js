import { pool } from "../db.js"
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import bcrypt from 'bcrypt';

export const createOrder = async (req, res) => {
    const { userId, subtotal, cartItems } = req.body;
    const shipping_date = new Date();

    shipping_date.setDate(shipping_date.getDate() + 7);
    const formatted_date = `${shipping_date.getDate().toString().padStart(2, '0')}/${(shipping_date.getMonth() + 1).toString().padStart(2, '0')}/${shipping_date.getFullYear()}`;
    const status = 'En proceso';
    const tracking = Math.floor(Math.random() * 1000000000);

    try {
        const [rows] = await pool.query('INSERT INTO orden (id_user, tracking_number, cost, status, shipping_date) VALUES (?, ?, ?, ?, ?)', [userId, tracking, subtotal, status, formatted_date]);
        cartItems.forEach(element => {
            pool.query('INSERT INTO orden_product (id_orden, id_product, quantity) VALUES (?, ?, ?)', [rows.insertId, element.id, element.quantity]);
        });
        pool.query('DELETE FROM cart WHERE id_user = ?', [userId]);
        res.send({ status: 'Orden_producto creada' });
    } catch (error) {
        console.error('Error al crear orden:', error);
        res.status(500).send({ message: 'Error al crear orden' });
    }
}

export const orderList = async (req, res) => {
    try {
        const { id } = req.params;
        const query = `SELECT
            orden.*, 
            user.address, 
            orden_product.id AS orden_product_id,
            orden_product.id_product,
            orden_product.quantity,
            product.name AS product_name,
            product.price AS product_price
            FROM orden
            JOIN user ON orden.id_user = user.id
            JOIN orden_product ON orden.id = orden_product.id_orden
            JOIN product ON orden_product.id_product = product.id
            WHERE orden.id_user = ?
        `;
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
                orden.id_user AS IdUsuario 
            FROM orden 
            INNER JOIN usuario ON orden.id_user = usuario.id
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
                orden.id_user AS IdUsuario 
            FROM orden 
            INNER JOIN usuario ON orden.id_user = usuario.id
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