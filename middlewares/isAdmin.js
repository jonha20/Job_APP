
function isAdminMiddleware(req, res, next) {
  
  if (!req.user) {
    return res.status(401).json({ message: "No autenticado" });
  }

  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Acceso denegado: se requiere rol de administrador" });
  }

  next(); // El usuario es admin, continúa con la ruta
}

module.exports = isAdminMiddleware;
