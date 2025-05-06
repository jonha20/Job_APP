const Adpgadmin = require("../models/favorite_pgadmin.model");

//GET

const getUserFavorites = async (req, res) => {
  const { email } = req.params;
  try {
    const favorites = await Adpgadmin.getUserFavorites(email);
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Error en la BBDD" });
  }
};

//CREATE

const addUserFavorite = async (req, res) => {
  const insertAd = req.body;
  if (
    "title" in insertAd &&
    "description" in insertAd &&
    "country" in insertAd &&
    "salary" in insertAd &&
    "id_user" in insertAd
  ) {
    try {
      const response = await Adpgadmin.addUserFavorite(insertAd);
      res.status(200).json({
        items_updated: response,
        data: insertAd,
      });
    } catch (error) {
      res.status(500).json({ error: "Error en la BBDD" });
    }
  } else {
    res.status(400).json({ error: "Faltan campos en la entrada" });
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
        res.status(200).json({
            message: "Entrada eliminada exitosamente",
            items_updated: response,
        });
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
