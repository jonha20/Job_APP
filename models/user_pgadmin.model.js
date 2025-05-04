const pool = require("../config/config");
const queries = require("../utils/queries"); // Queries SQL
const bcrypt = require("bcrypt"); // Importar bcrypt para la autenticación

// Función para verificar permisos
const verifyPassword = async (providedPassword, storedPasswordHash) => {
  const match = await bcrypt.compare(providedPassword, storedPasswordHash);
  if (!match) {
    throw new Error("Unauthorized: Invalid password");
  }
};

// GET
const getAllUsers = async (providedPassword, adminPasswordHash) => {
  let client, result;
  try {
    // Verificar permisos
    await verifyPassword(providedPassword, adminPasswordHash);

    client = await pool.connect(); // Espera a abrir conexión
    const data = await client.query(queries.getUsers);
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

// GET by ID
const getUserById = async (id) => {
  let client, result;
  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.getUserById, [id]);
    result = data.rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

// CREATE
const createUser = async(email, name,  password, rol, logged=false) => {
  let client, result;
  try{
      client = await pool.connect();
      const data = await client.query(`INSERT INTO users(email, name, password, rol ,logged)
                                      VALUES ($1, $2, $3, $4, $5)`,[ email,name, password, rol, logged])
      result = data.rowCount
  }catch(err){
      console.log(err);
      throw(err);
  }finally{
      client.release()
  }
  return result
};

// UPDATE

const updateUser = async (user) => {
  const { email, name, token, logged, rol, old_email } = user;
  let client, result;
  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.updateUser, [
      email,
      name,
      token,
      logged,
      rol,
      old_email,
    ]);
    result = data.rowCount;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

// DELETE
const deleteUser = async (email, providedPassword, adminPasswordHash) => {
  let client, result;
  try {
    // Verificar permisos
    await verifyPassword(providedPassword, adminPasswordHash);

    client = await pool.connect(); // Espera a abrir conexión
    const data = await client.query(queries.deleteUser, [email]);
    result = data.rowCount;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const setLoggedTrue = async (email) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(
      `UPDATE users
              SET logged = true 
              WHERE email = $1
              RETURNING *; `,
      [email]
    );
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const setLoggedFalse = async (email) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(
      `UPDATE users
              SET logged = false 
              WHERE email = $1
              RETURNING *; `,
      [email]
    );
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const existUser = async(email) => {
  let client, result;
  try{
      client = await pool.connect();
      const data = await client.query(`SELECT * FROM users WHERE email = $1 `,[email])
      result = data.rows[0]
  }catch(err){
      console.log(err);
      throw(err);
  }finally{
      client.release()
  }
  return result
};

const ad = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  setLoggedTrue,
  setLoggedFalse,
  existUser,
};

module.exports = ad; // Exportar el objeto ad con la función createAd
