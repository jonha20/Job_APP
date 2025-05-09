const express = require('express');
const router = express.Router();
const pool = require('../config/config');

// GET /dashboard - Vista del administrador para crear y visualizar sus anuncios
router.get('/:id',  async (req, res) => {
    try {
        // Obtener todos los anuncios creados por el administrador
        const result = await pool.query(
            'SELECT o.*, u.name as creator_name, u.email as creator_email FROM oferta o INNER JOIN users u ON o.id_user = u.id WHERE o.id_user = $1',
            [req.user.id]
        );

        res.json({
            success: true,
            data: {
                ads: result.rows,
                user: {
                    id: req.user.id,
                    name: req.user.name,
                    email: req.user.email,
                    role: req.user.role
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el dashboard del administrador',
            error: error.message
        });
    }
});

module.exports = router; 