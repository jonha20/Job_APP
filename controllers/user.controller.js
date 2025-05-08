const Userpgadmin = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const regex = require('../utils/regex');
const saltRounds = 10;
const jwt_secret = process.env.ULTRA_SECRET_KEY;

//getAllUsers
const getAllUsers = async (req, res) => {
    try {
        const users = await Userpgadmin.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

//getUserById
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Userpgadmin.getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

const createUser = async (req, res) => {
  let data;
  try {
      const hashPassword = await bcrypt.hash(req.body.token, saltRounds);
      if(regex.validateEmail(req.body.email) && regex.validatePassword(req.body.token)){
          data = await Userpgadmin.createUser(req.body.name, req.body.email, hashPassword, req.body.rol);
          res.status(201).json(data)
      }else{
          res.status(400).json({msg: 'Invalid email or password'});
      }  
  } catch (error) {
      res.status(400).json({"error":error})
  }
};

//updateUser
const updateUser = async (req, res) => {
    const updateUser = req.body;
    if (
        "email" in updateUser &&
        "name" in updateUser &&
        "rol" in updateUser &&
        "old_email" in updateUser
      ) {
        try {
          const response = await Userpgadmin.updateUser(updateUser);
          res.status(200).json({
            items_updated: response,
            data: updateUser,
          });
        } catch (error) {
          res.status(500).json({ error: "Error en la BBDD" });
        }
      } else {
        res.status(400).json({ error: "Faltan campos en la entrada" });
      }
};

//deleteUser
const deleteUser = async (req, res) => {
    const { email } = req.params;
    try {
        const response = await Userpgadmin.deleteUser(email);
        if (response) {
            res.status(200).json({ message: "Usuario eliminado" });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

//loginUser
const loginUser = async (req, res) => {
  let data;
  try {
      const {email, token} = req.body
      data = await Userpgadmin.existUser(email);
      console.log(data)
      if(!data){
          res.status(400).json({ msg: 'Incorrect user or password'}); 
      }else{
          const match = await bcrypt.compare(token, data.token);
          if(match){
              await Userpgadmin.setLoggedTrue(req.body.email)
              const {email, name} = data;
              const userForToken = {
                  email: email,
                  name: name,
              };
              const token = jwt.sign(userForToken, jwt_secret, {expiresIn: '20m'});
              res
              .status(200)
              .json({
                  msg:'Correct authentication',
                  token: token});
          }else {
              res.status(400).json({ msg: 'Incorrect user or password'});
          }
      }        
  } catch (error) {
      console.log('Error:', error);
  }
};

const logoutUser = async(req, res) => {
  let data;
  try {
      data = await Userpgadmin.setLoggedFalse(req.params.email)
      res.status(200).json({message: 'Token deleted'});
  } catch (error) {
      console.log('Error:', error);
  }
};

const recoverPassword = async (req, res) => {
  const { email } = req.params;
  try {
      const user = await Userpgadmin.getUserByEmail(email);
      if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      // Aquí puedes enviar un correo electrónico al usuario con el enlace para restablecer la contraseña
      res.status(200).json({ message: 'Correo de recuperación enviado' });
  } catch (error) {
      console.error('Error al recuperar la contraseña:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const restorePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      await Userpgadmin.updateUserPassword(email, hashedPassword);
      res.status(200).json({ message: 'Contraseña restablecida con éxito' });
  } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
};


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    recoverPassword,
    restorePassword,
}; 