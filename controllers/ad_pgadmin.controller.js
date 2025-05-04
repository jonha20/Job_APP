const Adpgadmin = require('../models/ad_pgadmin.model');

const getAllAds = async (req, res) => {
    try {
        const ads = await Adpgadmin.getAllAds();
        res.status(200).json(ads);
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

const getAdById = async (req, res) => {
    const { id } = req.params;
    try {
        const ad = await Adpgadmin.getAdById(id);
        if (ad) {
            res.status(200).json(ad);
        } else {
            res.status(404).json({ error: "Anuncio no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
}

// Crear nuevo anuncio (admin)
const createAd = async (req, res) => {
    const insertAd = req.body;
    if (
        "title" in insertAd &&
        "description" in insertAd &&
        "country" in insertAd &&
        "salary" in insertAd &&
        "id_user" in insertAd
      ) {
        try {
          const response = await Adpgadmin.createAd(insertAd);
          res.status(200).json({
            items_updated: response,
            data: insertAd,
          });
        } catch (error) {
          res.status(500).json({ error: "Error en la BBDD" });
        }
      } else {
        res.status(400).json({ error: "Faltan campos en la entrada" });
      }
};


// Editar anuncio (admin)
const updateAd = async (req, res) => {
    const updateAd = req.body;
    if (
        "title" in updateAd &&
        "description" in updateAd &&
        "country" in updateAd &&
        "salary" in updateAd &&
        "id_user" in updateAd &&
        "old_title" in updateAd
      ) {
        try {
          const response = await Adpgadmin.updateAd(updateAd);
          res.status(200).json({
            items_updated: response,
            data: updateAd,
          });
        } catch (error) {
          res.status(500).json({ error: "Error en la BBDD" });
        }
      } else {
        res.status(400).json({ error: "Faltan campos en la entrada" });
      }
};

// Borrar anuncio (admin)
const deleteAd = async (req, res) => {
    const deleteAd = req.body;
    if (
        "title" in deleteAd
      ) {
        try {
          const response = await Adpgadmin.deleteAd(deleteAd);
          res.status(200).json({
            items_updated: response,
            data: deleteAd,
          });
        } catch (error) {
          res.status(500).json({ error: "Error en la BBDD" });
        }
      } else {
        res.status(400).json({ error: "Faltan campos en la entrada" });
      }
};

// // Buscar anuncios
// const searchAds = async (req, res) => {
//     try {
//         const { query, type, category, location } = req.query;
//         const filter = {};
        
//         if (query) {
//             filter.$or = [
//                 { title: { $regex: query, $options: 'i' } },
//                 { description: { $regex: query, $options: 'i' } }
//             ];
//         }
        
//         if (type) filter.type = type;
//         if (category) filter.category = category;
//         if (location) filter.location = location;
        
//         const ads = await Ad.find(filter)
//             .populate('createdBy', 'name email')
//             .sort({ createdAt: -1 });
            
//         res.json(ads);
//     } catch (error) {
//         res.status(500).json({ message: 'Error en la búsqueda', error: error.message });
//     }
// };

module.exports = {
    createAd,
    updateAd,
    deleteAd,
    getAllAds,
    getAdById,
}; 