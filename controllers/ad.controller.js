const Ad = require("../models/ad.model");

const getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find({});
    console.log(ads);

    if (ads.length === 0) {
      // Si no hay anuncios
      if (req.headers.accept && req.headers.accept.includes("application/json")) {
        return res.status(404).json({ msj: "No hay Jobs" });
      } else {
        return res.render("home", { results: [], userIsLoggedIn: req.session?.user ? true : false });
      }
    }

    // Si hay anuncios
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      // Respuesta para API
      return res.status(200).json(ads);
    } else {
      // Renderizar la vista "home.pug"
      return res.render("home", { results: ads, userIsLoggedIn: req.session?.user ? true : false });
    }
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(400).json({ msj: `ERROR: ${error.stack}` });
    } else {
      return res.status(500).send("Error interno del servidor");
    }
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
