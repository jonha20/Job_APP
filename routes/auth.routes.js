const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth.controller');
const pool = require('../config/config');
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'your-secret-key'; // En producción, esto debería estar en variables de entorno

// Rutas de autenticación
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/logout', (req, res) => {
    res.json({ message: 'Logout exitoso' });
});

module.exports = router; 