import { pool } from "../db.js"

export const createProduct = async (req, res) => {
    const { name, img, description, price } = req.body;

    try {
        const [rows] = await pool.query('INSERT INTO product (name, img, description, price) VALUES (?, ?, ?, ?)', [name, img, description, price]);
        res.send({ status: 'Producto creado' })
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).send({ message: 'Error al crear producto' });
    }
}

export const productList = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM product');
        res.send(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send({ message: 'Error al obtener productos' });
    }
}

export const indexProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM product WHERE id = ?', [id]);
        res.send(rows);
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).send({ message: 'Error al obtener producto' });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, img, description, price } = req.body;

    try {
        const [rows] = await pool.query('UPDATE product SET name = ?, img = ?, description = ?, price = ? WHERE id = ?', [name, img, description, price, id]);
        res.send({ status: 'Producto actualizado' });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).send({ message: 'Error al actualizar producto' });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query('DELETE FROM product WHERE id = ?', [id]);
        res.send({ status: 'Producto eliminado' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).send({ message: 'Error al eliminar producto' });
    }
}