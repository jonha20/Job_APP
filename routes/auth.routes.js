const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth.controller');

// Rutas de autenticación
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router; 