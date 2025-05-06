const queries = {
  // Anuncios

  createAd: `INSERT INTO favourite (title, description, country, salary, id_user)
            VALUES ($1,$2,$3,$4,$5);`,
  updateAd: `UPDATE favourite
	SET 
        title=$1, 
        description=$2, 
        country=$3,  
        salary=$4,
        id_user=$5
	WHERE 
        title=$6;`,
  deleteAd: `DELETE FROM favourite WHERE title=$1;`,
  getAdById: `SELECT * FROM favourite WHERE id_offer=$1;`,
  getAllAds: `SELECT * FROM favourite;`,

  //Usuarios

  getUsers: `SELECT * FROM public.users;`,
  getUserById: `SELECT * FROM users WHERE id=$1;`,
  getUserByEmail: `SELECT * FROM users WHERE email=$1;`,
  createUser: `INSERT INTO users (email, name, password, logged, rol)
            VALUES ($1,$2,$3,$4,$5);`,
  updateUser: `UPDATE users
    SET 
        email=$1, 
        name=$2, 
        rol=$3
    WHERE
        email=$4;`,
  deleteUser: `DELETE FROM users WHERE email=$1;`,

  //Favoritos

  getUserFavorites: `SELECT email, name, title, description, country, salary FROM users
                INNER JOIN favourite ON id = id_user
                where email = $1`,
  addUserFavorite: `INSERT INTO favourite (title, description, country, salary, id_user)
            VALUES ($1,$2,$3,$4,$5);`,
  deleteUserFavourite: `DELETE FROM favourite WHERE id_offer = $1 RETURNING *;`,

  //RECOVER / RESET PASSWORD

  getUserByEmail: `SELECT * FROM users WHERE email=$1;`,
  updateUserPassword: `UPDATE users SET password=$1 WHERE email=$2;`,
};

module.exports = queries;
