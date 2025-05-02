const routes = require('express').Router();
const user = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/verifiedToken');
const isAdminMiddleware = require('../middlewares/isAdmin');

// routes.get('/login', user.logout);
// routes.get('/signup', user.logout);
routes.get('/favorites', user.userFavorites);
routes.get('/profile', user.userProfile);
// routes.get('/dashboard', authMiddleware, isAdminMiddleware, user)
// routes.get('/users', authMiddleware, isAdminMiddleware, user.usersProfiles)

module.exports = routes;