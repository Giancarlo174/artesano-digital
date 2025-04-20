/**
 * Controlador de Usuarios
 * Maneja la lógica de negocio relacionada con usuarios
 */

const Usuario = require('../models/usuario.model');
const ResponseHandler = require('../utils/responseHandler');

class UsuarioController {
  /**
   * Registrar un nuevo usuario
   * @param {Object} req - Objeto de solicitud
   * @param {Object} res - Objeto de respuesta
   * @param {Function} next - Función siguiente middleware
   */
  static async register(req, res, next) {
    try {
      // Verificar si ya existe un usuario con ese correo
      const existingUser = await Usuario.getByEmail(req.body.correo);
      if (existingUser) {
        return ResponseHandler.error(
          res,
          'Ya existe un usuario con ese correo electrónico',
          409
        );
      }

      // Crear nuevo usuario
      const nuevoUsuario = new Usuario(req.body);
      const usuarioGuardado = await nuevoUsuario.save();

      // Responder con éxito
      return ResponseHandler.success(
        res,
        { 
          id_usuario: usuarioGuardado.id_usuario,
          nombre: usuarioGuardado.nombre,
          correo: usuarioGuardado.correo
        },
        'Usuario registrado exitosamente',
        201
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Iniciar sesión de usuario
   * @param {Object} req - Objeto de solicitud
   * @param {Object} res - Objeto de respuesta
   * @param {Function} next - Función siguiente middleware
   */
  static async login(req, res, next) {
    try {
      const { correo, password } = req.body;

      // Buscar usuario por correo
      const usuario = await Usuario.getByEmail(correo);
      if (!usuario) {
        return ResponseHandler.error(
          res,
          'Credenciales inválidas',
          401
        );
      }

      // TODO: Implementar validación real de contraseña
      // Por ahora, simulamos una validación exitosa (dummy)
      // Aquí se implementaría la comparación de contraseñas

      // Responder con información de usuario y token (dummy)
      return ResponseHandler.success(
        res,
        {
          id_usuario: usuario.id_usuario,
          nombre: usuario.nombre,
          correo: usuario.correo,
          tipo_usuario: usuario.tipo_usuario,
          token: 'dummy-jwt-token'  // En una implementación real: generarJWT(usuario)
        },
        'Inicio de sesión exitoso'
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtener perfil del usuario autenticado
   * @param {Object} req - Objeto de solicitud
   * @param {Object} res - Objeto de respuesta
   * @param {Function} next - Función siguiente middleware
   */
  static async getProfile(req, res, next) {
    try {
      const id_usuario = req.user.id_usuario;
      const usuario = await Usuario.getById(id_usuario);

      if (!usuario) {
        return ResponseHandler.error(
          res,
          'Usuario no encontrado',
          404
        );
      }

      // No devolvemos información sensible
      const userProfile = {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        telefono: usuario.telefono,
        direccion: usuario.direccion,
        tipo_usuario: usuario.tipo_usuario
      };

      return ResponseHandler.success(
        res,
        userProfile,
        'Perfil recuperado exitosamente'
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Actualizar perfil del usuario autenticado
   * @param {Object} req - Objeto de solicitud
   * @param {Object} res - Objeto de respuesta
   * @param {Function} next - Función siguiente middleware
   */
  static async updateProfile(req, res, next) {
    try {
      const id_usuario = req.user.id_usuario;
      let usuario = await Usuario.getById(id_usuario);

      if (!usuario) {
        return ResponseHandler.error(
          res,
          'Usuario no encontrado',
          404
        );
      }

      // Si se intenta cambiar el correo, verificar que no esté en uso
      if (req.body.correo && req.body.correo !== usuario.correo) {
        const existingUser = await Usuario.getByEmail(req.body.correo);
        if (existingUser) {
          return ResponseHandler.error(
            res,
            'El correo electrónico ya está en uso',
            409
          );
        }
      }

      // Actualizar datos
      Object.assign(usuario, req.body);
      const usuarioActualizado = await usuario.save();

      return ResponseHandler.success(
        res,
        {
          id_usuario: usuarioActualizado.id_usuario,
          nombre: usuarioActualizado.nombre,
          correo: usuarioActualizado.correo,
          telefono: usuarioActualizado.telefono,
          direccion: usuarioActualizado.direccion
        },
        'Perfil actualizado exitosamente'
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtener todos los usuarios (solo admin)
   * @param {Object} req - Objeto de solicitud
   * @param {Object} res - Objeto de respuesta
   * @param {Function} next - Función siguiente middleware
   */
  static async getAllUsers(req, res, next) {
    try {
      const usuarios = await Usuario.getAll();
      
      // Eliminar información sensible antes de enviar
      const segurosUsuarios = usuarios.map(usuario => ({
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        telefono: usuario.telefono,
        tipo_usuario: usuario.tipo_usuario
      }));

      return ResponseHandler.success(
        res,
        segurosUsuarios,
        'Usuarios recuperados exitosamente'
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtener usuario por ID (solo admin)
   * @param {Object} req - Objeto de solicitud
   * @param {Object} res - Objeto de respuesta
   * @param {Function} next - Función siguiente middleware
   */
  static async getUserById(req, res, next) {
    try {
      const id = req.params.id;
      const usuario = await Usuario.getById(id);

      if (!usuario) {
        return ResponseHandler.error(
          res,
          'Usuario no encontrado',
          404
        );
      }

      // Datos seguros para devolver
      const usuarioSeguro = {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        telefono: usuario.telefono,
        direccion: usuario.direccion,
        tipo_usuario: usuario.tipo_usuario
      };

      return ResponseHandler.success(
        res,
        usuarioSeguro,
        'Usuario recuperado exitosamente'
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Actualizar usuario por ID (solo admin)
   * @param {Object} req - Objeto de solicitud
   * @param {Object} res - Objeto de respuesta
   * @param {Function} next - Función siguiente middleware
   */
  static async updateUser(req, res, next) {
    try {
      const id = req.params.id;
      let usuario = await Usuario.getById(id);

      if (!usuario) {
        return ResponseHandler.error(
          res,
          'Usuario no encontrado',
          404
        );
      }

      // Si se intenta cambiar el correo, verificar que no esté en uso
      if (req.body.correo && req.body.correo !== usuario.correo) {
        const existingUser = await Usuario.getByEmail(req.body.correo);
        if (existingUser) {
          return ResponseHandler.error(
            res,
            'El correo electrónico ya está en uso',
            409
          );
        }
      }

      // Actualizar datos
      Object.assign(usuario, req.body);
      const usuarioActualizado = await usuario.save();

      return ResponseHandler.success(
        res,
        {
          id_usuario: usuarioActualizado.id_usuario,
          nombre: usuarioActualizado.nombre,
          correo: usuarioActualizado.correo,
          tipo_usuario: usuarioActualizado.tipo_usuario
        },
        'Usuario actualizado exitosamente'
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Eliminar usuario por ID (solo admin)
   * @param {Object} req - Objeto de solicitud
   * @param {Object} res - Objeto de respuesta
   * @param {Function} next - Función siguiente middleware
   */
  static async deleteUser(req, res, next) {
    try {
      const id = req.params.id;
      const usuario = await Usuario.getById(id);

      if (!usuario) {
        return ResponseHandler.error(
          res,
          'Usuario no encontrado',
          404
        );
      }

      // En una implementación real, podríamos tener un método delete
      // Por ahora, simulamos éxito
      return ResponseHandler.success(
        res,
        { id_usuario: id },
        'Usuario eliminado exitosamente'
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsuarioController;
