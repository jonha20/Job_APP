const express = require('express');
const router = express.Router();
const Ad = require('../controllers/ad.controller');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin')

// Crear nuevo anuncio
router.post('/',auth, isAdmin,  Ad.createAd);

// Obtener todos los anuncios
router.get('/', Ad.getAllAds);

// Obtener anuncio por ID
router.get('/:id', Ad.searchAds);

// Actualizar anuncio
router.put('/:id', auth, isAdmin, Ad.updateAd);

// Eliminar anuncio
router.delete('/:id', auth, isAdmin, Ad.deleteAd);

module.exports = router; 