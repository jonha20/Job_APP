const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

async function register(req, res) {
    try {
        const { email, password, name } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear nuevo usuario
        const user = new User({
            email,
            password,
            name,
            role: 'user'
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
        res.status(500).json({ message: 'Error en el registro' });
    }
}

async function login(req, res) {
    const { username, password } = req.body;
    
    try {
        const user = await User.findOne({ email: username });
        
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
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
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el inicio de sesión' });
    }
}

function logout(req, res) {
    res.clearCookie('token');
    res.json({ message: 'Logout exitoso' });
}

module.exports = { register, login, logout }; 