const pool = require("../config/config");
const queries = require("../utils/queries"); // Queries SQL

// GET

const getUserFavorites = async (email) => {
  let client, result;
  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.getUserFavorites, [email]);
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
}

//CREATE

const addUserFavorite = async (ad) => {
  const { title, description, country, salary, id_user } = ad;
  let client, result;
  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.addUserFavorite, [
      title,
      description,
      country,
      salary,
      id_user,
    ]);
    result = data.rowCount;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
}

// DELETE

const deleteUserFavorite = async (id) => {
  let client, result;
  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.deleteUserFavourite, [id]);
    result = data.rowCount;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
}

module.exports = {
  getUserFavorites,
  addUserFavorite,
  deleteUserFavorite
};