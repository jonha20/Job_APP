const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ad',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Índice compuesto para evitar duplicados
favoriteSchema.index({ user: 1, ad: 1 }, { unique: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;

 