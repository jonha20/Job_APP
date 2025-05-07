const pool = require("../config/config");
const queries = require("../utils/queries"); // Queries SQL

// GET

const getUserFavorites = async (id) => {
  let client, result;
  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.getUserFavorites, [id]);
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
}

// Obtener favoritos por usuario y anuncio
const getUserFavoriteByAdId = async (userId, adId) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM favorites WHERE id_user = $1 AND id_ad = $2",
      [userId, adId]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

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
  deleteUserFavorite,
  getUserFavoriteByAdId
};