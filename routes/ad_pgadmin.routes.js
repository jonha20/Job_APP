const express = require('express');
const router = express.Router();
const Adpgadmin = require('../controllers/ad_pgadmin.controller');
const auth = require('../middlewares/auth');
const isAdmin = require("../middlewares/isAdmin");

// Crear nuevo anuncio
router.post('/',auth, isAdmin ,Adpgadmin.createAd);

// Obtener todos los anuncios
router.get('/', Adpgadmin.getAllAds);

// Obtener anuncio por ID
router.get('/:id', Adpgadmin.getAdById);

// Actualizar anuncio
router.put('/', auth, isAdmin, Adpgadmin.updateAd);

// Eliminar anuncio
router.delete('/',auth, isAdmin ,Adpgadmin.deleteAd);

module.exports = router; 