const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const regex = require("../utils/regex");

const userProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const userRecord = await User.userProfile(userId);
    if (!userRecord) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userRecord);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user data", error });
  }
};

const userFavorites = async (req, res) => { 
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
        return res.status(401).json({ message: "No token provided" });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
    
        const favorites = await User.userFavorites(userId);
        if (!favorites) {
        return res.status(404).json({ message: "No favorites found" });
        }
    
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user favorites", error });
    }
    }

const user = {
    userProfile,
    userFavorites,
};

module.exports = user;
