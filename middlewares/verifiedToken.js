const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');
require('dotenv').config();
const jwt_secret = process.env.ULTRA_SECRET_KEY;

const protectedRoutes = express.Router();

protectedRoutes.use((req, res, next) => {
    const token = req.headers['access_token'];

    if (token) {
      jwt.verify(token, jwt_secret, async (err, decoded) => {
        let data = await User.existUser(decoded.email);
        if (data.logged == true) {
          req.decoded = decoded;    
          next();   
        } else {
          return res.json({ msg: 'Invalid token' });
        }
      });
    } else {
      res.send({ 
          msg: 'Token not provided' 
      });
    }
 });

module.exports = protectedRoutes;