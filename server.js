require('dotenv').config();
const express = require("express"); // Importamos el paquete express
const mongoose = require("mongoose"); // Importamos mongoose para MongoDB
const app = express(); // Inciializar servidor con express
const port = 3000; // Puerto a usar por el servidor
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const connectDB = require('./config/mongo_config'); // Importa la conexión a MongoDB

// Conexión a MongoDB
connectDB();

// Middlewares
app.use(express.json()); // Middleware para parsear el body de las peticiones
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Middleware para servir archivos estáticos de front. CSS,JS,Assets
app.use(morgan('dev'));
app.use(cookieParser());

// Configuración de vistas PUG - Motor de plantillas
app.set("view engine", "pug");
app.set("views", "./views"); // Carpeta donde se encuentran las vistas

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user_pgadmin.routes');
const adRoutes = require('./routes/ad.routes');
const favoriteRoutes = require('./routes/favorite_pgadmin.routes');
const dashboardRoutes = require('./routes/admin.routes');
const passwordRoutes = require('./routes/password.routes');

// Rutas de autenticación (vistas)
app.use('/', authRoutes);

// Rutas API
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/ads', adRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/password', passwordRoutes);

// Documentación
// http://localhost:3000/api-swagger
app.use('/api-swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.get('/home', (req, res) => {
  res.render('home')
});

// Middleware para manejar errores 404
app.use((req, res) => {
  res.status(404).render('error', { message: 'Página no encontrada' });
});


// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});