const express = require("express");
const router = express.Router();
const Adpgadmin = require("../controllers/favorite.controller");
const auth = require("../middlewares/auth");
const Admongo = require("../controllers/ad.controller");
const isAdmin = require('../middlewares/isAdmin')

// Añadir desde admin offer a mongoDB
router.post("/", auth, isAdmin,  Admongo.createAd);

// Añadir a favoritos
router.post("/add", auth, Adpgadmin.addUserFavorite);

// Obtener favoritos del usuario
router.get("/", auth, Adpgadmin.getUserFavorites);

// Eliminar de favoritos
router.post("/:id", auth, Adpgadmin.deleteUserFavorite);

module.exports = router;
