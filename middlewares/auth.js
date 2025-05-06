const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key'; // En producción, esto debería estar en variables de entorno

const auth = (req, res, next) => {
    // Obtener el token del header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No hay token, autorización denegada' });
    }

    try {
        // Verificar token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token no válido' });
    }
};

module.exports = auth; 