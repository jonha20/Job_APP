const express = require("express");
const router = express.Router();
const Userpgadmin = require("../controllers/user_pgadmin.controller");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

// Crear nuevo user
router.post("/signup", Userpgadmin.createUser);

// Obtener todos los users
router.get("/", auth, isAdmin, Userpgadmin.getAllUsers);

// Obtener user por ID
router.get("/:id", auth, Userpgadmin.getUserById);

// Actualizar user
router.put("/profile", Userpgadmin.updateUser);

// Eliminar user
router.delete("/", auth, isAdmin, Userpgadmin.deleteUser);

// Recuperar contraseña
router.put('/recoverpassword', Userpgadmin.recoverPassword);

// Restaurar contraseña
router.put('/restorepassword', Userpgadmin.restorePassword);

module.exports = router;
