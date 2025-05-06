const express = require("express");
const router = express.Router();
const Userpgadmin = require("../controllers/user_pgadmin.controller");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

// Obtener todos los users
router.get("/", auth , isAdmin, Userpgadmin.getAllUsers);

// Obtener user por ID
router.get("/:id", auth, isAdmin, Userpgadmin.getUserById);

// Actualizar user
router.put("/", Userpgadmin.updateUser);

// Eliminar user
router.delete("/:email", auth, isAdmin, Userpgadmin.deleteUser);

// Recuperar contraseña
router.put('/recoverpassword', Userpgadmin.recoverPassword);

// Restaurar contraseña
router.put('/restorepassword', Userpgadmin.restorePassword);

module.exports = router;
