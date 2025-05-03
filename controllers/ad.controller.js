const Ad = require('../models/ad.model');

// Crear nuevo anuncio (admin)
const createAd = async (req, res) => {
    try {
        const { title, description, type, category, location, salary, startDate, endDate, amount, requirements } = req.body;
        const createdBy = req.user.id;
        
        const ad = new Ad({
            title,
            description,
            type,
            category,
            location,
            salary,
            startDate,
            endDate,
            amount,
            requirements,
            createdBy
        });
        
        await ad.save();
        res.status(201).json({ message: 'Anuncio creado exitosamente', ad });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear anuncio', error: error.message });
    }
};

// Editar anuncio (admin)
const updateAd = async (req, res) => {
    try {
        const adId = req.params.id;
        const updateData = req.body;
        
        const ad = await Ad.findByIdAndUpdate(
            adId,
            updateData,
            { new: true }
        );
        
        if (!ad) {
            return res.status(404).json({ message: 'Anuncio no encontrado' });
        }
        
        res.json({ message: 'Anuncio actualizado exitosamente', ad });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar anuncio', error: error.message });
    }
};

// Borrar anuncio (admin)
const deleteAd = async (req, res) => {
    try {
        const adId = req.params.id;
        const ad = await Ad.findByIdAndDelete(adId);
        
        if (!ad) {
            return res.status(404).json({ message: 'Anuncio no encontrado' });
        }
        
        res.json({ message: 'Anuncio eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar anuncio', error: error.message });
    }
};

// Buscar anuncios
const searchAds = async (req, res) => {
    try {
        const { query, type, category, location } = req.query;
        const filter = {};
        
        if (query) {
            filter.$or = [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ];
        }
        
        if (type) filter.type = type;
        if (category) filter.category = category;
        if (location) filter.location = location;
        
        const ads = await Ad.find(filter)
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });
            
        res.json(ads);
    } catch (error) {
        res.status(500).json({ message: 'Error en la búsqueda', error: error.message });
    }
};

module.exports = {
    createAd,
    updateAd,
    deleteAd,
    searchAds
}; 