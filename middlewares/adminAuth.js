const adminAuth = (req, res, next) => {
    // Verificar si el usuario está autenticado y es administrador
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Acceso denegado. Se requieren privilegios de administrador.'
        });
    }
    next();
};

module.exports = adminAuth; 