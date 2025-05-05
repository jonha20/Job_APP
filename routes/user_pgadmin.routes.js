const express = require("express");
const router = express.Router();
const Userpgadmin = require("../controllers/user_pgadmin.controller");
const auth = require("../middlewares/auth");

// Crear nuevo user
router.post("/signup", Userpgadmin.createUser);

// Obtener todos los users
router.get("/", auth, Userpgadmin.getAllUsers);

// Obtener user por ID
router.get("/:id", auth, Userpgadmin.getUserById);

// Actualizar user
router.put("/profile", Userpgadmin.updateUser);

// Eliminar user
router.delete("/", auth, Userpgadmin.deleteUser);

//Login
router.post('/login', Userpgadmin.loginUser);

// Logout
router.post('/logout', Userpgadmin.logoutUser);

// Recuperar contraseña
router.put('/recover', Userpgadmin.recoverPassword);

// Restaurar contraseña
router.put('/restore', Userpgadmin.restorePassword);

module.exports = router;
