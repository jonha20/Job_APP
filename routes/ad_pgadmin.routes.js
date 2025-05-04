const express = require('express');
const router = express.Router();
const Adpgadmin = require('../controllers/ad_pgadmin.controller');
const auth = require('../middlewares/auth');


// Crear nuevo anuncio
router.post('/',auth,Adpgadmin.createAd);

// Obtener todos los anuncios
router.get('/', Adpgadmin.getAllAds);

// Obtener anuncio por ID
router.get('/:id', Adpgadmin.getAdById);

// Actualizar anuncio
router.put('/', auth, Adpgadmin.updateAd);

// Eliminar anuncio
router.delete('/',auth, Adpgadmin.deleteAd);

module.exports = router; 