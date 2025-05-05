require('dotenv').config();
const express = require("express"); // Importamos el paquete express
const mongoose = require("mongoose"); // Importamos mongoose para MongoDB
const app = express(); // Inciializar servidor con express
const port = 3000; // Puerto a usar por el servidor
const morgan = require('morgan');

// Conexión a MongoDB
const mongoURL = process.env.MONGOURL;
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error conectando a MongoDB:', err));

// Middlewares
app.use(express.json()); // Middleware para parsear el body de las peticiones
app.use(express.static("public")); // Middleware para servir archivos estáticos de front. CSS,JS,Assets
app.use(morgan('dev'));

// Configuración de vistas PUG - Motor de plantillas
app.set("view engine", "pug");
app.set("views", "./views"); // Carpeta donde se encuentran las vistas

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user_pgadmin.routes');
const adRoutes = require('./routes/ad_pgadmin.routes');
const favoriteRoutes = require('./routes/favorite_pgadmin.routes');

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/favorites', favoriteRoutes);

app.get('/', (req, res) => {
  res.render('home')
});

// Middleware para manejar errores 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});