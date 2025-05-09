const Adpgadmin = require("../models/favorite.model");
const jwt = require("jsonwebtoken");
//GET


/**
 * Obtiene los anuncios favoritos del usuario autenticado y renderiza la vista del dashboard.
 * @async
 * @function getUserFavorites
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * 
 * @throws Renderiza una vista de error si no hay token o si ocurre un problema con la base de datos.
 */


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



/**
 * Añade un anuncio a los favoritos del usuario autenticado y redirige a la vista de favoritos.
 * @async
 * @function addUserFavorite
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws Devuelve un JSON de error si no hay token o si ocurre un problema con la base de datos.
 */




const addUserFavorite = async (req, res) => {
  try {
    // Obtener el token del usuario
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No autorizado, token no encontrado" });
    }

    // Decodificar el token para obtener el ID del usuario
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id_user = decoded.id; // ID del usuario logueado

    // Obtener los datos del anuncio desde el cuerpo de la solicitud
    const { title, description, country, salary } = req.body;

    // Validar que todos los campos estén presentes
    if (!title || !description || !country || !salary) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // Añadir el anuncio a favoritos
    const response = await Adpgadmin.addUserFavorite({
      title,
      description,
      country,
      salary,
      id_user
    });

    if (response) {
      res.status(200).json({ message: "Anuncio añadido a favoritos correctamente" });
    } else {
      res.status(500).json({ message: "Error al añadir el anuncio a favoritos" });
    }

  } catch (error) {
    console.error("Error al añadir a favoritos:", error);
    res.status(500).json({ error: "Error en la base de datos", details: error.message });
  }
};

//DELETE


/**
 * Elimina un anuncio favorito del usuario por ID y redirige a la vista de favoritos.
 ** @async
 * @function deleteUserFavorite
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws {error} Devuelve un JSON de error si la entrada no se encuentra o hay un problema con la base de datos.
 */



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
