const Favorite = require('../models/favorite.model');
const Ad = require('../models/ad.model');

// Guardar favorito
const addFavorite = async (req, res) => {
    try {
        const { adId } = req.body;
        const userId = req.user.id;

        // Verificar si el anuncio existe
        const ad = await Ad.findById(adId);
        if (!ad) {
            return res.status(404).json({ message: 'Anuncio no encontrado' });
        }

        // Verificar si ya es favorito
        const existingFavorite = await Favorite.findOne({ user: userId, ad: adId });
        if (existingFavorite) {
            return res.status(400).json({ message: 'Este anuncio ya está en tus favoritos' });
        }

        const favorite = new Favorite({ user: userId, ad: adId });
        await favorite.save();
        
        res.status(201).json({ message: 'Favorito guardado exitosamente', favorite });
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar favorito', error: error.message });
    }
};

// Borrar favorito
const removeFavorite = async (req, res) => {
    try {
        const favoriteId = req.params.id;
        const userId = req.user.id;

        const favorite = await Favorite.findOneAndDelete({ _id: favoriteId, user: userId });
        
        if (!favorite) {
            return res.status(404).json({ message: 'Favorito no encontrado' });
        }
        
        res.json({ message: 'Favorito eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar favorito', error: error.message });
    }
};

// Obtener favoritos del usuario
const getFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        const favorites = await Favorite.find({ user: userId })
            .populate('ad')
            .sort({ createdAt: -1 });
            
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener favoritos', error: error.message });
    }
};

module.exports = {
    addFavorite,
    removeFavorite,
    getFavorites
}; 