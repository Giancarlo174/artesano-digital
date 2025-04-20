/**
 * Controlador de Productos
 * Maneja la lógica de negocio relacionada con productos
 */

const Producto = require('../models/producto.model');
const ResponseHandler = require('../utils/responseHandler');

class ProductoController {
  /**
   * Obtener todos los productos
   * @param {Object} req - Objeto de solicitud
   * @param {Object} res - Objeto de respuesta
   * @param {Function} next - Función siguiente middleware
   */
  static async getAllProducts(req, res, next) {
    try {
      const { popular } = req.query;
  
      let productos;
      if (popular === 'true') {
        productos = await Producto.getPopulares(); // Nuevo método
      } else {
        productos = await Producto.getAll();
      }
  
      return ResponseHandler.success(res, productos, 'Productos recuperados exitosamente');
    } catch (error) {
      next(error);
    }
  }
  

  /**
   * Obtener productos activos
   * @param {Object} req - Objeto de solicitud
   * @param {Object} res - Objeto de respuesta
   * @param {Function} next - Función siguiente middleware
   */
  static async getActiveProducts(req, res, next) {
    try {
      const productos = await Producto.getActivos();
      return ResponseHandler.success(
        res,
        productos,
        'Productos activos recuperados exitosamente'
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtener productos por tienda
   * @param {Object} req - Objeto de solicitud
   * @param {Object} res - Objeto de respuesta
   * @param {Function} next - Función siguiente middleware
   */
  static async getProductsByTienda(req, res, next) {
    try {
      const idTienda = req.params.id;
      const productos = await Producto.getByTienda(idTienda);
      
      return ResponseHandler.success(
        res,
        productos,
        `Productos de la tienda ${idTienda} recuperados exitosamente`
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtener producto por ID
   * @param {Object} req - Objeto de solicitud
   * @param {Object} res - Objeto de respuesta
   * @param {Function} next - Función siguiente middleware
   */
  static async getProductById(req, res, next) {
    try {
      const id = req.params.id;
      const producto = await Producto.getById(id);
      
      if (!producto) {
        return ResponseHandler.error(
          res,
          'Producto no encontrado',
          404
        );
      }
      
      return ResponseHandler.success(
        res,
        producto,
        'Producto recuperado exitosamente'
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Crear un nuevo producto
   * @param {Object} req - Objeto de solicitud
   * @param {Object} res - Objeto de respuesta
   * @param {Function} next - Función siguiente middleware
   */
  static async createProduct(req, res, next) {
    try {
      const nuevoProducto = new Producto(req.body);
      const productoGuardado = await nuevoProducto.save();
      
      return ResponseHandler.success(
        res,
        productoGuardado,
        'Producto creado exitosamente',
        201
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Actualizar un producto existente
   * @param {Object} req - Objeto de solicitud
   * @param {Object} res - Objeto de respuesta
   * @param {Function} next - Función siguiente middleware
   */
  static async updateProduct(req, res, next) {
    try {
      const id = req.params.id;
      let producto = await Producto.getById(id);
      
      if (!producto) {
        return ResponseHandler.error(
          res,
          'Producto no encontrado',
          404
        );
      }
      
      // Actualizar datos
      Object.assign(producto, req.body);
      const productoActualizado = await producto.save();
      
      return ResponseHandler.success(
        res,
        productoActualizado,
        'Producto actualizado exitosamente'
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Eliminar un producto
   * @param {Object} req - Objeto de solicitud
   * @param {Object} res - Objeto de respuesta
   * @param {Function} next - Función siguiente middleware
   */
  static async deleteProduct(req, res, next) {
    try {
      const id = req.params.id;
      const producto = await Producto.getById(id);
      
      if (!producto) {
        return ResponseHandler.error(
          res,
          'Producto no encontrado',
          404
        );
      }
      
      await Producto.delete(id);
      
      return ResponseHandler.success(
        res,
        { id_producto: id },
        'Producto eliminado exitosamente'
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductoController;
