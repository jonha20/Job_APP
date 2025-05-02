const pool = require("../config/config");

const userProfile = async (email) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(`SELECT * FROM users WHERE email = $1 `, [
      email,
    ]);
    result = data.rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const userFavorites = async (email) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(
      `SELECT email, name, rol, title ,salary, country, description FROM users
        inner join oferta on users.id = id_user
        where users.email = $1 `,
      [email]
    );
    result = data.rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const users = {
  userProfile,
  userFavorites,
};

module.exports = users;
