const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/config');
const queries = require('../utils/queries');

async function register(req, res) {
    let client;
    try {
        const { email, password, name } = req.body;

        // Verificar si el usuario ya existe
        client = await pool.connect();
        const existingUser = await client.query(queries.getUserByEmail, [email]);
        
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Hash de la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear nuevo usuario
        await client.query(queries.createUser, [
            email,
            name,
            hashedPassword,
            false, // logged
            'user' // rol
        ]);

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: {
                email,
                name,
                role: 'user'
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el registro' });
    } finally {
        if (client) client.release();
    }
}

async function login(req, res) {
    let client;
    try {
        const { username, password } = req.body;
        
        // Buscar usuario
        client = await pool.connect();
        const result = await client.query(queries.getUserByEmail, [username]);
        const user = result.rows[0];
        
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Verificar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Actualizar estado de login
        await client.query(
            'UPDATE users SET logged = true WHERE email = $1',
            [username]
        );

        // Generar token
        const token = jwt.sign(
            { id: user.id, role: user.rol }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );
        
        res.cookie('token', token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000 // 1 hora
        });

        res.json({
            message: 'Login exitoso',
            user: {
                id: user.id,
                email: user.email,
                role: user.rol
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el inicio de sesión' });
    } finally {
        if (client) client.release();
    }
}

async function logout(req, res) {
    let client;
    try {
        const token = req.cookies.token;
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Actualizar estado de login
            client = await pool.connect();
            await client.query(
                'UPDATE users SET logged = false WHERE id = $1',
                [decoded.id]
            );
        }
        
        res.clearCookie('token');
        res.json({ message: 'Logout exitoso' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el logout' });
    } finally {
        if (client) client.release();
    }
}

module.exports = { register, login, logout }; 
module.exports = { register, login, logout }; 