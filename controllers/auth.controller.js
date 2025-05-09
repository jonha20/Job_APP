const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/config");
const queries = require("../utils/queries");
const { createUser } = require("../models/auth.model"); // Importar la función createUser

/**
 * Registra un nuevo usuario y redirige a la página de login.
 *
 * @async
 * @function register
 * @param {Object} req - Objeto de solicitud HTTP (requiere email, name, password, logged, rol) en el body.
 * @param {Object} res - Objeto de respuesta HTTP.
 * 
 * @throws Devuelve un mensaje de error si ocurre un fallo al crear el usuario.
 */

async function register(req, res) {

  const {email, name,  password, logged = false, rol = "user" } = req.body;
  try {
    const newUser = await createUser(email,name, password, logged, rol);
   res.redirect("/login");
  } catch (error) {
    res.status(500).send("Error en el registro");
  }
}


/**
 * Inicia sesión del usuario, verifica credenciales, genera un token JWT y redirige a la vista de anuncios.
 *
 * @async
 * @function login
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws Devuelve un mensaje de error si el usuario no existe, si la contraseña es incorrecta o si hay un error en la base de datos.
 */

async function login(req, res) {
  let client;
  try {
      const { email, password } = req.body;
      
      // Buscar usuario
      client = await pool.connect();
      const result = await client.query(queries.getUserByEmail, [email]);
      const user = result.rows[0];
      
      if (!user) {
          return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Verificar contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Actualizar estado de login
      await client.query("UPDATE users SET logged = true WHERE id = $1", [
          user.id,
      ]);
      // Generar token
      const token = jwt.sign(
          { id: user.id, email: user.email, role: user.rol, logged: user.logged }, 
          process.env.JWT_SECRET, 
          { expiresIn: '1h' }
      );
      
      res.cookie('token', token, {
          httpOnly: true,
          secure: false,
          maxAge: 3600000 // 1 hora
      });

      res.redirect("/ads"); // Redirigir a la página de inicio después del inicio de sesión exitoso
  } catch (error) {
      res.status(500).json({ message: 'Error en el inicio de sesión' });
  } finally {
      if (client) client.release();
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
    res.clearCookie("token");
    res.redirect('/login');
  } catch (error) {
    res.status(500).json({ message: "Error en el logout" });
  } finally {
    if (client) client.release();
  }
}

module.exports = { register, login, logout };
