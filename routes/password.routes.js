const express = require('express');
const router = express.Router();
const pool = require('../config/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validatePassword } = require('../utils/regex');

// GET /recoverpassword - Iniciar proceso de recuperación de contraseña
router.get('/recoverpassword', async (req, res) => {
    try {
        const { email } = req.query;
        
        if (!email) {
            return res.status(400).json({ 
                success: false,
                message: 'El email es requerido' 
            });
        }

        // Buscar usuario por email en PostgreSQL
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'Usuario no encontrado' 
            });
        }

        // Generar token de recuperación
        const token = jwt.sign(
            { 
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.rol // En PostgreSQL usamos 'rol' en lugar de 'role'
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' }
        );

        // En producción, aquí deberías enviar el token por email
        res.json({
            success: true,
            message: 'Correo de recuperación enviado',
            token: token // En producción, no devolver el token en la respuesta
        });
    } catch (error) {
        console.error('Error en recoverpassword:', error);
        res.status(500).json({
            success: false,
            message: 'Error al procesar la recuperación de contraseña',
            error: error.message
        });
    }
});

// GET /restorepassword - Restaurar contraseña con token
router.get('/restorepassword', async (req, res) => {
    try {
        const { token, newPassword } = req.query;

        if (!token || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Token y nueva contraseña son requeridos'
            });
        }

        // Validar nueva contraseña
        if (!validatePassword(newPassword)) {
            return res.status(400).json({
                success: false,
                message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial'
            });
        }

        // Verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

        // Hash de la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar contraseña en PostgreSQL
        const result = await pool.query(
            'UPDATE users SET password = $1 WHERE id = $2 RETURNING *',
            [hashedPassword, decoded.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Contraseña actualizada con éxito'
        });
    } catch (error) {
        console.error('Error en restorepassword:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Token inválido'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expirado'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error al restaurar la contraseña',
            error: error.message
        });
    }
});

module.exports = router; 