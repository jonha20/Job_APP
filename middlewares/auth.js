const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; // Asegúrate de que JWT_SECRET esté definido en tu archivo .env

const auth = (req, res, next) => {
    // Obtener el token desde las cookies
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No hay token, autorización denegada' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Guardar los datos decodificados del token en req.user
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token no válido' });
    }
};

module.exports = auth; 