/**
 * @author Alejandro Reyes <alejandroreyes.com> 
 * @exports checkApiKey
 * @namespace middlewares
 */

/**
  * Función para comprobar si tiene API KEY
  * <pre>
  * Ejemplo:
  * GET http://localhost:3000/products?API_KEY=123abc
  * </pre>
  * @memberof middlewares 
  * @method checkApiKey 
  * @param {Object} req objeto de petición HTTP
  * @param {Object} res objeto de respuesta HTTP
  * @param {Object} next función que pasa a siguiente estado si la comprobación es correcta 
  * @throws {error} API KEY no proveída o errónea
  */

const checkApiKey = function (req, res, next) {
    // Comprobar si existe API KEY en BBDD pasada por cliente
    // LLamada al modelo ode users de la BBDD
    // SELECT * FROM users WHERE API_KEY = req.query.API_KEY
    // ...
    if (req.query.API_KEY === "123abc") {
        next(); // Pasa a la siguiente tarea
    } else {
        //Mando mensaje de error
        res.status(401).send("Error. API KEY no proveída o errónea");
    }
}

module.exports = checkApiKey;