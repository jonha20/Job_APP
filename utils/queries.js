const queries = {
  // Anuncios

  createAd: `INSERT INTO oferta (title, description, country, salary, id_user)
            VALUES ($1,$2,$3,$4,$5);`,
  updateAd: `UPDATE oferta
	SET 
        title=$1, 
        description=$2, 
        country=$3,  
        salary=$4,
        id_user=$5
	WHERE 
        title=$6;`,
  deleteAd: `DELETE FROM oferta WHERE title=$1;`,
  getAdById: `SELECT * FROM oferta WHERE id_offer=$1;`,
  getAllAds: `SELECT * FROM oferta;`,

  //Usuarios

  getUsers: `SELECT * FROM public.users;`,
  getUserById: `SELECT * FROM users WHERE id=$1;`,
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
                INNER JOIN oferta ON id = id_user
                where email = $1`,
  addUserFavorite: `INSERT INTO oferta (title, description, country, salary, id_user)
            VALUES ($1,$2,$3,$4,$5);`,
  deleteUserFavourite: `DELETE FROM oferta WHERE title=$1;`,

  //RECOVER / RESET PASSWORD

  getUserByEmail: `SELECT * FROM users WHERE email=$1;`,
  updateUserPassword: `UPDATE users SET password=$1 WHERE email=$2;`,
};

module.exports = queries;
