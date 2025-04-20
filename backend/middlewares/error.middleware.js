/**
 * Middleware para manejo centralizado de errores
 */

const ResponseHandler = require('../utils/responseHandler');

module.exports = (err, req, res, next) => {
  console.error(err.stack);
  
  // Determinar código de estado HTTP
  const statusCode = err.statusCode || 500;
  
  // Mensaje de error
  const message = err.message || 'Error interno del servidor';
  
  // En producción, ocultar detalles técnicos
  const errorDetails = process.env.NODE_ENV === 'production' 
    ? null 
    : { stack: err.stack, details: err.details };

  return ResponseHandler.error(res, message, statusCode, errorDetails);
};
