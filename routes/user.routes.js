const express = require('express');
const router = express.Router();
const pool = require('../config/config');
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth');

// Registrar nuevo usuario
router.post('/', async (req, res) => {
    try {
        const { email, password, name, role = 'user' } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await pool.query(
            'INSERT INTO users (email, name, password, rol, logged) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [email, name, hashedPassword, role, false]
        );
        
        const user = result.rows[0];
        res.status(201).json({ 
            message: 'Usuario registrado exitosamente', 
            user: { 
                id: user.id, 
                email: user.email, 
                name: user.name,
                role: user.rol 
            } 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
    }
});

// Obtener lista de usuarios (solo admin)
router.get('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No autorizado' });
        }
        const result = await pool.query('SELECT id, email, name, rol FROM users');
        const users = result.rows.map(row => ({
            id: row.id,
            email: row.email,
            name: row.name,
            role: row.rol
        }));
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
});

// Actualizar perfil
router.put('/profile', auth, async (req, res) => {
    try {
        const { name, email } = req.body;
        const result = await pool.query('SELECT id, name, email, rol FROM users WHERE id = $1', [req.user.id]);
        const user = result.rows[0];
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (email && email !== user.email) {
            const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
            if (existingUser.rows.length > 0) {
                return res.status(400).json({ message: 'El email ya está en uso' });
            }
            user.email = email;
        }

        if (name) {
            user.name = name;
        }

        const updatedResult = await pool.query(
            'UPDATE users SET name = $1, email = $2, rol = $3 WHERE id = $4 RETURNING id, name, email, rol',
            [user.name, user.email, user.rol, user.id]
        );
        
        const updatedUser = updatedResult.rows[0];
        res.json({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.rol
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar perfil', error: error.message });
    }
});

// Eliminar usuario (solo admin)
router.delete('/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No autorizado' });
        }
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
});

module.exports = router; 