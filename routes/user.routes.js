const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const auth = require('../middlewares/auth');

// Registrar nuevo usuario
router.post('/', async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        const user = new User({
            email,
            password,
            name,
            role: role || 'user' // Si no se especifica rol, por defecto es 'user'
        });
        await user.save();
        res.status(201).json({ 
            message: 'Usuario registrado exitosamente', 
            user: { 
                id: user._id, 
                email: user.email, 
                name: user.name,
                role: user.role 
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
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
});

// Actualizar perfil
router.put('/profile', auth, async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'El email ya está en uso' });
            }
            user.email = email;
        }

        if (name) {
            user.name = name;
        }

        await user.save();
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
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
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await user.deleteOne();
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
});

module.exports = router; 