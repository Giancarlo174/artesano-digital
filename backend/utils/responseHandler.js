/**
 * Utilidad para estandarizar las respuestas de la API
 */

class ResponseHandler {
  /**
   * Crear respuesta exitosa
   * @param {object} res - Objeto de respuesta de Express
   * @param {any} data - Datos a enviar en la respuesta
   * @param {string} message - Mensaje descriptivo
   * @param {number} statusCode - Código HTTP (default: 200)
   */
  static success(res, data, message = 'Operación exitosa', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  /**
   * Crear respuesta de error
   * @param {object} res - Objeto de respuesta de Express
   * @param {string} message - Mensaje de error
   * @param {number} statusCode - Código HTTP (default: 400)
   * @param {any} errors - Detalles adicionales del error
   */
  static error(res, message = 'Error en la operación', statusCode = 400, errors = null) {
    const response = {
      success: false,
      message
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }
}

module.exports = ResponseHandler;
