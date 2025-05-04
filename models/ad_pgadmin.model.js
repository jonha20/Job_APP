const pool = require("../config/config");
const queries = require("../utils/queries"); // Queries SQL

// GET
const getAllAds = async () => {
  let client, result;
  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.getAllAds);
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
const getAdById = async (id) => {
  let client, result;
  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.getAdById, [id]);
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
const createAd = async (ad) => {
  const { title, description, country, salary, id_user } = ad;
  let client, result;
  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.createAd, [
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
};

// UPDATE
const updateAd = async (ad) => {
  const { title, description, country, salary, id_user, old_title } = ad;
  let client, result;
  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.updateAd, [
      title,
      description,
      country,
      salary,
      id_user,
      old_title,
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
const deleteAd = async (ad) => {
  const { title } = ad;
  let client, result;
  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.deleteAd, [title]);
    result = data.rowCount;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const ad = {
  createAd,
  updateAd,
  deleteAd,
  getAllAds,
  getAdById,
};

module.exports = ad; // Exportar el objeto ad con la función createAd
