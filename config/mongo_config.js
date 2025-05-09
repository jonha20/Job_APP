const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURL = process.env.MONGOURL || 'mongodb://localhost:27017/jobapp';
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        process.exit(1); // Salir del proceso si no se puede conectar
    }
};

module.exports = connectDB;