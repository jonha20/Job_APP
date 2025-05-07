const Adpgadmin = require("../models/favorite_pgadmin.model");
const jwt = require("jsonwebtoken");
//GET

const getUserFavorites = async (req, res) => {
  try {
    // Obtener el token de las cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).render("error", { message: "No autorizado, token no encontrado" });
    }

    // Decodificar el token para obtener el email
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    const role = decoded.role;

    // Obtener los favoritos del usuario desde la base de datos
    const favorites = await Adpgadmin.getUserFavorites(id);
    // Renderizar la vista "dashboard" con los favoritos
    res.render("dashboard", { favorites, role});
  } catch (error) {
    console.error("Error al obtener los favoritos:", error);
    res.status(500).render("error", { message: "Error en la base de datos" });
  }
};

//CREATE

const addUserFavorite = async (req, res) => {
  try {
    // Obtener el token del usuario
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No autorizado, token no encontrado" });
    }

    // Decodificar el token para obtener el ID del usuario
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;


    // Añadir el anuncio a favoritos
    const response = await Adpgadmin.addUserFavorite({ userId });

    res.redirect("/favorites"); // Redirigir a la página de anuncios después de añadir a favoritos
  } catch (error) {
    console.error("Error al añadir a favoritos:", error);
    res.status(500).json({ error: "Error en la base de datos", details: error.message });
  }
};

//DELETE

const deleteUserFavorite = async (req, res) => {
  const { id } = req.params;
    try {
        const response = await Adpgadmin.deleteUserFavorite(id);
        if (response === 0) {
            return res.status(404).json({ message: "Entrada no encontrada" });
        }
        res.redirect("/favorites"); // Redirigir a la página de favoritos después de eliminar
    } catch (error) {
        console.error("Error al eliminar la entrada:", error);
        res.status(500).json({ error: "Error en la BBDD", details: error.message });
    }
  };

module.exports = {
  getUserFavorites,
  addUserFavorite,
  deleteUserFavorite,
};
