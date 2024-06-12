import { pool } from "../db.js"
import bcrypt from 'bcrypt';


export const getUsuarios = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM  user')
    res.json(rows)
}

export const getUsuario = async (req, res) => {
    let [rows] = await pool.query('SELECT * FROM  user WHERE id = ?', [req.params.id])
    res.json(rows[0])
}

export const createUsuario = async (req, res) => {
    const { name, role, email, phone, adress, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const [existingUsers] = await pool.query('SELECT id FROM user WHERE email = ?', [email]);

        // Si ya existe un usuario con ese nombre, enviar un código de error
        if (existingUsers.length > 0) {
            return res.status(400).send({ message: 'El usuario ya existe' });
        }

        // Si el usuario no existe, continuar con la creación
        const hashedPassword = await bcrypt.hash(password, 10);

        const [rows] = await pool.query('INSERT INTO user (name, role, email, phone, address, password) VALUES (?, ?, ?, ?, ?, ?)', [name, role, email, phone, adress, hashedPassword]);

        res.send({
            id: rows.insertId,
            name,
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).send({ message: 'Error al crear usuario' });
    }
};


export const deleteUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar si el usuario existe
        const [existingUsers] = await pool.query('SELECT id FROM user WHERE id = ?', [id]);

        // Si no existe un usuario con ese ID, enviar un código de error
        if (existingUsers.length === 0) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        // Si el usuario existe, eliminarlo
        await pool.query('DELETE FROM user WHERE id = ?', [id]);

        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).send({ message: 'Error al eliminar usuario' });
    }
};

export const updateUsuario = async (req, res) => {
    const { id } = req.params;

    const { name, email, phone, role, address, password } = req.body;

    try {
        // Verificar si el usuario existe
        let [existingUsers] = await pool.query('SELECT * FROM user WHERE id = ?', [id]);

        existingUsers = existingUsers[0];

        // Si no existe un usuario con ese ID, enviar un código de error
        if (existingUsers.length === 0) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        if (role == null) {
            if (password == '') {
                await pool.query('UPDATE user SET name = ?, address = ?, phone = ?, email = ? WHERE id = ?', [name, address, phone, email, id]);

            } else if (password == existingUsers.password) {

                await pool.query('UPDATE user SET name = ?, address = ?, phone = ?, email = ?, role=? WHERE id = ?', [name, address, phone, email, role, id]);

            } else {
                // Si el usuario existe, actualizar sus datos
                const hashedPassword = await bcrypt.hash(password, 10);

                await pool.query('UPDATE user SET name = ?, password = ?,  address = ?, phone = ?, email = ?, role=? WHERE id = ?', [name, hashedPassword, address, phone, email, role, id]);

            }

            const [user] = await pool.query('SELECT * FROM user WHERE id = ?', [id]);

            res.json({ message: 'Usuario actualizado exitosamente', user: user });
        } else {
            if (password == '') {
                await pool.query('UPDATE user SET name = ?, role = ?, address = ?, phone = ?, email = ? WHERE id = ?', [name, role, address, phone, email, id]);

            } else if (password == existingUsers.password) {

                await pool.query('UPDATE user SET name = ?, role = ?, address = ?, phone = ?, email = ?, role=? WHERE id = ?', [name, role, address, phone, email, role, id]);

            } else {
                // Si el usuario existe, actualizar sus datos
                const hashedPassword = await bcrypt.hash(password, 10);

                await pool.query('UPDATE user SET name = ?, password = ?, role = ?, address = ?, phone = ?, email = ?, role=? WHERE id = ?', [name, hashedPassword, role, address, phone, email, role, id]);

            }

            const [user] = await pool.query('SELECT * FROM user WHERE id = ?', [id]);

            res.json({ message: 'Usuario actualizado exitosamente', user: user });
        }

    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).send({ message: 'Error al actualizar usuario' });
    }
};


export const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(400).send({ message: 'Usuario no encontrado' });
        }

        const user = rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Contraseña incorrecta' });
        }

        return res.json({ message: 'login successfully', user: user });

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

