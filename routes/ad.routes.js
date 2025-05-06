const express = require('express');
const router = express.Router();
const Ad = require('../controllers/ad.controller');
const auth = require('../middlewares/auth');

// Crear nuevo anuncio
router.post('/',  Ad.createAd);

// Obtener todos los anuncios
router.get('/', Ad.getAllAds);

// Obtener anuncio por ID
router.get('/:id', Ad.searchAds);

// Actualizar anuncio
router.put('/:id', Ad.updateAd);

// Eliminar anuncio
router.delete('/:id', Ad.deleteAd);

module.exports = router; 