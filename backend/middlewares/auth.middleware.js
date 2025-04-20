/**
 * Middleware de autenticación y autorización
 */

const supabaseService = require('../services/supabase.service');
const ResponseHandler = require('../utils/responseHandler');

class AuthMiddleware {
  /**
   * Verifica que el usuario esté autenticado
   */
  static async isAuthenticated(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return ResponseHandler.error(res, 'Token no proporcionado', 401);
      }
  
      const token = authHeader.split(' ')[1];
  
      // SIMULACIÓN TEMPORAL
      if (token === 'dummy-jwt-token') {
        // Simulamos que es un usuario con id_usuario 5
        req.user = { id_usuario: 5, tipo_usuario: 'admin', correo: 'irvin@correo.com' };
        console.log('Simulando usuario admin:', req.user); // 👈
        return next();
      }
  
      // Si no es dummy, intenta verificar con Supabase
      const supabase = supabaseService.getClient();
      const { data, error } = await supabase.auth.getUser(token);
  
      if (error || !data.user) {
        return ResponseHandler.error(res, 'Token inválido', 401);
      }
  
      req.user = data.user;
      next();
    } catch (error) {
      next(error);
    }
  }
  

  /**
   * Verifica que el usuario tenga rol de administrador
   */
  static isAdmin(req, res, next) {
    if (!req.user || req.user.tipo_usuario !== 'admin') {
      return ResponseHandler.error(
        res,
        'Acceso prohibido. Se requiere rol de administrador',
        403
      );
    }
    next();
  }
}

module.exports = AuthMiddleware;
