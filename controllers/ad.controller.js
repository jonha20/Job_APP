const Ad = require("../models/ad.model");
const jwt = require('jsonwebtoken');
const pool = require("../config/config");

const getAllAds = async (req, res) => {
  try {
    let userIsLoggedIn = false;

    // Verificar si hay un token en las cookies
    const token = req.cookies.token;
    if (token) {
      try {
        // Decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Usar el campo "logged" del token si está disponible
        userIsLoggedIn = decoded.logged || false;
      } catch (err) {
        console.error("Error al verificar el token:", err);
      }
    }

    // Obtener las ofertas de empleo desde la base de datos
    const ads = await Ad.find({});

    // Renderizar la vista "home.pug" con los datos
    return res.render("home", { results: ads, userIsLoggedIn });
  } catch (error) {
    console.error(`ERROR: ${error.stack}`);
    return res.status(500).send("Error interno del servidor");
  }
};

// Crear nuevo anuncio (admin)
const createAd = async (req, res) => {
  try {
    const { title, description, country, salary } = req.body;

    const ad = new Ad({
      title,
      description,
      country,
      salary,
    });

    await ad.save();
    res.status(201).json({ message: "Anuncio creado exitosamente", ad });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear anuncio", error: error.message });
  }
};

// Editar anuncio (admin)
const updateAd = async (req, res) => {
  try {
    const adId = req.params.id;
    const { title, description, country, salary } = req.body;

    const ad = await Ad.findByIdAndUpdate(
      adId,
      { title, description, country, salary },
      { new: true, runValidators: true }
    );

    if (!ad) {
      return res.status(404).json({ message: "Anuncio no encontrado" });
    }

    res.json({ message: "Anuncio actualizado exitosamente", ad });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar anuncio", error: error.message });
  }
};

// Borrar anuncio (admin)
const deleteAd = async (req, res) => {
  try {
    const adId = req.params.id;
    const ad = await Ad.findByIdAndDelete(adId);

    if (!ad) {
      return res.status(404).json({ message: "Anuncio no encontrado" });
    }

    res.json({ message: "Anuncio eliminado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar anuncio", error: error.message });
  }
};

// Buscar anuncios
const searchAds = async (req, res) => {
    try {
      const { id, title, description, country, salary } = req.query;
      const filter = {};
  
      // Agregar filtros dinámicamente según los parámetros proporcionados
      if (id) filter._id = id;
      if (title) filter.title = { $regex: title, $options: "i" }; // Búsqueda parcial (case-insensitive)
      if (description) filter.description = { $regex: description, $options: "i" };
      if (country) filter.country = { $regex: country, $options: "i" };
      if (salary) filter.salary = { $regex: salary, $options: "i" };
  
      // Buscar anuncios con los filtros
      const ads = await Ad.find(filter);
  
      if (ads.length === 0) {
        return res.status(404).json({ message: "No se encontraron anuncios" });
      }
  
      res.json(ads);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error en la búsqueda", error: error.message });
    }
  };

module.exports = {
  createAd,
  updateAd,
  deleteAd,
  searchAds,
  getAllAds,
};
