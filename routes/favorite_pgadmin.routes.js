const express = require("express");
const router = express.Router();
const Adpgadmin = require("../controllers/favorite_pgadmin.controller");
const auth = require("../middlewares/auth");

// Agregar a favoritos
router.post("/", auth, Adpgadmin.addUserFavorite);

// Obtener favoritos del usuario
router.get("/", auth, Adpgadmin.getUserFavorites);

// Eliminar de favoritos
router.delete("/", auth, Adpgadmin.deleteUserFavorite);

module.exports = router;
