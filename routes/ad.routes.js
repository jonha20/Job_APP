const express = require('express');
const router = express.Router();
const Ad = require('../models/ad.model');
const auth = require('../middlewares/auth');

// Crear nuevo anuncio
router.post('/', auth, async (req, res) => {
    try {
        const ad = new Ad({
            ...req.body,
            createdBy: req.user.id
        });
        await ad.save();
        res.status(201).json(ad);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear anuncio', error: error.message });
    }
});

// Obtener todos los anuncios
router.get('/', async (req, res) => {
    try {
        const ads = await Ad.find().populate('createdBy', 'name email');
        res.json(ads);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener anuncios', error: error.message });
    }
});

// Obtener anuncio por ID
router.get('/:id', async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id).populate('createdBy', 'name email');
        if (!ad) {
            return res.status(404).json({ message: 'Anuncio no encontrado' });
        }
        res.json(ad);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener anuncio', error: error.message });
    }
});

// Actualizar anuncio
router.put('/:id', auth, async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);
        if (!ad) {
            return res.status(404).json({ message: 'Anuncio no encontrado' });
        }
        if (ad.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No autorizado' });
        }
        Object.assign(ad, req.body);
        await ad.save();
        res.json(ad);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar anuncio', error: error.message });
    }
});

// Eliminar anuncio
router.delete('/:id', auth, async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);
        if (!ad) {
            return res.status(404).json({ message: 'Anuncio no encontrado' });
        }
        if (ad.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No autorizado' });
        }
        await ad.deleteOne();
        res.json({ message: 'Anuncio eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar anuncio', error: error.message });
    }
});

module.exports = router; 