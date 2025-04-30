/**
 * @author Alejandro Reyes <alejandroreyes.com> 
 * @exports manage404
 */

/**
  * Función para tratar rutas no encontradas
  * Última ruta por defecto. En caso de no encontrarse ninguna anterior, devolvemos un 404
  * @memberof middlewares 
  * @method manage404 
  * @param {Object} req objeto de petición HTTP
  * @param {Object} res objeto de respuesta HTTP
  * @param {Object} next función que pasa a siguiente estado si la comprobación es correcta 
  */
const manage404 = (req,res) => {
    res.status(404).json({
        msj:"404 not found",
        img:"https://seranking.com/blog/wp-content/uploads/2021/01/404_01-min.jpg"
    });
}

module.exports = manage404;

