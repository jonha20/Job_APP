const express = require("express");
const router = express.Router();
const Adpgadmin = require("../controllers/favorite.controller");
const auth = require("../middlewares/auth");
const Admongo = require("../controllers/ad.controller");
const isAdmin = require('../middlewares/isAdmin')

// Agregar a favoritos
router.post("/", auth, isAdmin,  Admongo.createAd);

// Obtener favoritos del usuario
router.get("/", auth, Adpgadmin.getUserFavorites);

// Eliminar de favoritos
router.post("/:id", auth, Adpgadmin.deleteUserFavorite);

module.exports = router;
