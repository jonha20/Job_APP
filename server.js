const express = require("express"); // Importamos el paquete express
const app = express(); // Inciializar servidor con express
const port = 3000; // Puerto a usar por el servidor

app.use(express.json()); // Middleware para parsear el body de las peticiones
app.use(express.static('public')); //

app.set('view engine', 'pug');
app.set('views','./views');

app.get('/login', (req, res) => {
    res.render('login');
  });
  
  app.get('/register', (req, res) => {
    res.render('register');
  });
  

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
  });