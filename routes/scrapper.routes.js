const express = require("express");
const router = express.Router();
const { exec } = require("child_process");

router.post("/favorites", (req, res) => {
  exec("node scrapper.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar el scrapper: ${error.message}`);
      return res.status(500).render("error", { message: "Error al ejecutar el scrapper" });
    }
    if (stderr) {
      console.error(`Error en el scrapper: ${stderr}`);
      return res.status(500).render("error", { message: "Error en el scrapper" });
    }
    console.log(`Resultado del scrapper: ${stdout}`);
    res.redirect("/favorites"); // Redirigir de vuelta a la página de favoritos
  });
});

module.exports = router;