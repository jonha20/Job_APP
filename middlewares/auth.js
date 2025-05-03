const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = async (req, res, next) => {
    try {
        // Verificar si hay token en el header
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ message: 'No hay token, autorización denegada' });
        }

        // Extraer el token del formato "Bearer token"
        const token = authHeader.replace('Bearer ', '');
        
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Buscar el usuario
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Token no válido' });
        }

        // Agregar el usuario al request
        req.user = user;
        next();
    } catch (error) {
        console.error('Error de autenticación:', error);
        res.status(401).json({ message: 'No autorizado', error: error.message });
    }
}; 