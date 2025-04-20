/**
 * Rutas para manejo de productos
 */

const express = require('express');
const { body } = require('express-validator');
const ProductoController = require('../controllers/producto.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
const Validator = require('../utils/validator');

const router = express.Router();

// Validaciones comunes
const productoValidations = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
  body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  body('stock').isInt({ min: 0 }).withMessage('El stock debe ser un número entero positivo'),
  body('id_tienda').isInt().withMessage('ID de tienda inválido'),
  body('activo').optional().isBoolean().withMessage('El campo activo debe ser booleano'),
  Validator.validateRequest
];

// Rutas públicas
router.get('/', ProductoController.getAllProducts);
router.get('/activos', ProductoController.getActiveProducts);
router.get('/tienda/:id', ProductoController.getProductsByTienda);
router.get('/:id', ProductoController.getProductById);

// Rutas de administrador
router.post('/', [
  AuthMiddleware.isAuthenticated, 
  AuthMiddleware.isAdmin,
  ...productoValidations
], ProductoController.createProduct);

router.put('/:id', [
  AuthMiddleware.isAuthenticated, 
  AuthMiddleware.isAdmin,
  ...productoValidations
], ProductoController.updateProduct);

router.delete('/:id', [
  AuthMiddleware.isAuthenticated, 
  AuthMiddleware.isAdmin
], ProductoController.deleteProduct);

module.exports = router;
