const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/config");
const queries = require("../utils/queries");
const { createUser, findUserByEmail } = require("../models/auth.model"); // Importar la función createUser

async function register(req, res) {
  const {email, name,  password, logged = false, rol = "user" } = req.body;
  try {
    const newUser = await createUser(email,name, password, logged, rol);
   res.redirect("/login");
  } catch (error) {
    res.status(500).send("Error en el registro");
  }
}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
           
            await pool.query("UPDATE users SET logged = true WHERE id = $1", [user.id]);
  
            res.redirect(user.role === 'admin' ? '/home' : '/register');
        } else {
            res.status(401).send('Credenciales inválidas');
        }
    } catch (error) {
        res.status(500).send('Error en el inicio de sesión');
    }
}

async function logout(req, res) {
  let client;
  try {
    const token = req.cookies.token;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await pool.query("UPDATE users SET logged = false WHERE id = $1", [
            decoded.id,
            ]);
    }
    res.redirect('/register');
    res.clearCookie("token");
    res.json({ message: "Logout exitoso" });
  } catch (error) {
    res.status(500).json({ message: "Error en el logout" });
  } finally {
    if (client) client.release();
  }
}

module.exports = { register, login, logout };
