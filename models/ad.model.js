const mongoose = require('mongoose');

const objectSchema = {
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    country: { // Corregido el typo
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    }
};

const AdSchema = mongoose.Schema(objectSchema);

const Ad = mongoose.model("jobs", AdSchema);

module.exports = Ad;



