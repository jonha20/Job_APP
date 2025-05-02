const express = require("express"); // Importamos el paquete express
const app = express(); // Inciializar servidor con express
const port = 3000; // Puerto a usar por el servidor

app.use(express.json()); // Middleware para parsear el body de las peticiones
app.use(express.static("public")); // Middleware para servir archivos estáticos de front. CSS,JS,Assets

// Configuración de vistas PUG - Motor de plantillas
app.set("view engine", "pug");
app.set("views", "./views"); // Carpeta donde se encuentran las vistas

const usersRouter = require('./routes/user.routes');

app.get('/', (req, res) => {
  res.render('home')
});

app.use('', usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});