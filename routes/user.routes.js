const express = require("express");
const router = express.Router();
const Userpgadmin = require("../controllers/user.controller");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

// Obtener todos los users
router.get("/", Userpgadmin.getAllUsers);

// Obtener user por ID
router.get("/:id",  Userpgadmin.getUserById);

// Actualizar user
router.put("/", Userpgadmin.updateUser);

// Eliminar user
router.delete("/:email", Userpgadmin.deleteUser);

// Recuperar contraseña
router.put('/recoverpassword', Userpgadmin.recoverPassword);

// Restaurar contraseña
router.put('/restorepassword', Userpgadmin.restorePassword);

module.exports = router;
