/**
 * Utilidad para validación de datos
 * Implementa funciones auxiliares para validar entradas
 */

const { validationResult } = require('express-validator');
const ResponseHandler = require('./responseHandler');

class Validator {
  /**
   * Middleware para validar resultados de express-validator
   */
  static validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHandler.error(
        res, 
        'Error de validación', 
        422, 
        errors.array()
      );
    }
    next();
  }

  /**
   * Método para verificar que un ID sea válido
   */
  static isValidId(id) {
    return id && !isNaN(parseInt(id)) && parseInt(id) > 0;
  }
}

module.exports = Validator;
