const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorite.model');
const auth = require('../middlewares/auth');

// Agregar a favoritos
router.post('/', auth, async (req, res) => {
    try {
        const favorite = new Favorite({
            user: req.user.id,
            ad: req.body.adId
        });
        await favorite.save();
        res.status(201).json(favorite);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar a favoritos', error: error.message });
    }
});

// Obtener favoritos del usuario
router.get('/', auth, async (req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.user.id })
            .populate('ad')
            .populate('user', 'name email');
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener favoritos', error: error.message });
    }
});

// Eliminar de favoritos
router.delete('/:id', auth, async (req, res) => {
    try {
        const favorite = await Favorite.findOne({
            _id: req.params.id,
            user: req.user.id
        });
        if (!favorite) {
            return res.status(404).json({ message: 'Favorito no encontrado' });
        }
        await favorite.deleteOne();
        res.json({ message: 'Favorito eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar favorito', error: error.message });
    }
});

module.exports = router; 