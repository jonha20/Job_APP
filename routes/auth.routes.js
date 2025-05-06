const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth.controller');
const pool = require('../config/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key'; // En producción, esto debería estar en variables de entorno

// Rutas de autenticación
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));
router.post('/register', register);
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Buscar usuario por email
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        
        // Verificar contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        
        // Generar token JWT
        const token = jwt.sign(
            { 
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.rol
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.json({ 
            message: 'Login exitoso',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.rol
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});
router.get('/logout', logout);
router.post('/logout', (req, res) => {
    res.json({ message: 'Logout exitoso' });
});

module.exports = router; 