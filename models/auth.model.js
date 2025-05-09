const pool = require("../config/config");
const bcrypt = require("bcryptjs");
const queries = require("../utils/queries"); // Queries SQL

async function createUser(
  email,
  name,
  password,
  logged = false,
  rol = "user"
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const values = [ email,name, hashedPassword, logged, rol];

  const result = await pool.query(queries.createUser, values);
  return result.rows[0];
}

async function findUserByEmail(email) {
    const values = [email];
    const result = await pool.query(queries.getUserByEmail, values);
    return result.rows[0];
}


module.exports = { createUser , findUserByEmail };
