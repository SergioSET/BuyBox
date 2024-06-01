import { pool } from "../db.js"
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import bcrypt from 'bcrypt';


export const getTotalCart = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM  cart')
    res.json(rows)
}

export const getCarritoPersona = async (req, res) => {
    const { id } = req.params;

    try {
        // const [rows] = await pool.query('SELECT * FROM cart WHERE id_user = ?', [id]);

        const [rows] = await pool.query('SELECT cart.*, product.name, product.price, product.img FROM cart JOIN product ON cart.id_product = product.id WHERE id_user = ?', [id]);

        res.json(rows);
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).send({ message: 'Error al obtener el carrito' });
    }
}

export const addCart = async (req, res) => {
    const id_user = req.body.itemCart.id_user;
    const id_product = req.body.itemCart.id_product;
    const quantity = req.body.itemCart.quantity;

    try {
        const [rows] = await pool.query('INSERT INTO cart (id_user, id_product, quantity) VALUES (?, ?, ?)', [id_user, id_product, quantity]);

        res.send({ id: rows.insertId, id_product });
    } catch (error) {
        console.error('Error añadir al carrito:', error);
        res.status(500).send({ message: 'Error al añadir al carrito' });
    }
};


export const deleteProdCart = async (req, res) => {
    const { id } = req.params;

    try {
        const [existingUsers] = await pool.query('SELECT id FROM cart WHERE id = ?', [id]);

        // Si no existe un usuario con ese ID, enviar un código de error
        if (existingUsers.length === 0) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        // Si el usuario existe, eliminarlo
        await pool.query('DELETE FROM cart WHERE id = ?', [id]);

        res.json({ message: 'Eliminado del carrito' });
    } catch (error) {
        console.error('Error al eliminar del carrito:', error);
        res.status(500).send({ message: 'Error al eliminar del carrito' });
    }
};

export const updateCarrito = async (req, res) => {
    const { id, quantity } = req.body;
    try {
        // Verificar si el usuario existe
        const [existingUsers] = await pool.query('SELECT id FROM cart WHERE id = ?', [id]);

        // Si no existe un usuario con ese ID, enviar un código de error
        if (existingUsers.length === 0) {
            return res.status(404).send({ message: 'Producto no encontrado en el carro' });
        }

        await pool.query('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, id]);


        const [user] = await pool.query('SELECT * FROM cart WHERE id = ?', [id]);

        res.json({ message: 'Producto actualizado exitosamente', user: user });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).send({ message: 'Error al actualizar producto' });
    }
};



