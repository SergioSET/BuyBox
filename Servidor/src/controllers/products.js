import { pool } from "../db.js"
import multer from 'multer';

// Configuración de multer para guardar las imágenes en una carpeta específica
const storage = multer.diskStorage({
    destination: '../QuickBox/Public/ProductImages',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('imagen');

export const createProduct = async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ message: 'Error al cargar la imagen' });
        } else if (err) {
            return res.status(500).json({ message: 'Error al cargar la imagen' });
        }

        const { name, descripcion, price } = req.body;
        const imagen = req.file;
        const ruta = "/public/productImages/"   + imagen.filename;
        


        try {
            const [rows] = await pool.query('INSERT INTO product (name, img, description, price) VALUES (?,?, ?, ?)', [name,ruta, descripcion, price]);
            res.send({ status: 'Producto creado' });
        } catch (error) {
            console.error('Error al crear producto:', error);
            res.status(500).send({ message: 'Error al crear el producto' });
        }
    });
};

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
    const { name, ruta, descripcion, price } = req.body;

    try {
        const [rows] = await pool.query('UPDATE product SET name = ?, description = ?, price = ? WHERE id = ?', [name, descripcion, price, id]);
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