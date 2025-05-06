const express = require('express');
const app = express();
const port = 3000;

// Importar rutas
const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

// Middleware para parsear JSON
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de administrador
app.use('/api/admin', adminRoutes);

// Rutas de usuario
app.use('/api/users', userRoutes);

// Endpoints de usuario
app.post('/api/user', (req, res) => {
    // Registro de usuario
    res.json({ message: 'Usuario registrado' });
});

app.put('/api/user', (req, res) => {
    // Editar perfil
    res.json({ message: 'Perfil actualizado' });
});

app.delete('/api/user', (req, res) => {
    // Borrar usuario (admin)
    res.json({ message: 'Usuario eliminado' });
});

// Endpoints de anuncios
app.post('/api/ads', (req, res) => {
    // Crear anuncio (admin)
    res.json({ message: 'Anuncio creado' });
});

app.put('/api/ads', (req, res) => {
    // Editar anuncio (admin)
    res.json({ message: 'Anuncio actualizado' });
});

app.delete('/api/ads', (req, res) => {
    // Borrar anuncio (admin)
    res.json({ message: 'Anuncio eliminado' });
});

// Endpoints de favoritos
app.post('/api/favorites', (req, res) => {
    // Guardar favorito
    res.json({ message: 'Favorito guardado' });
});

app.delete('/api/favorites', (req, res) => {
    // Borrar favorito
    res.json({ message: 'Favorito eliminado' });
});

// Endpoint de búsqueda
app.get('/api/search', (req, res) => {
    // Búsqueda de anuncios
    res.json({ message: 'Resultados de búsqueda' });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
}); 