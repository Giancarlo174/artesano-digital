/**
 * Rutas para manejo de usuarios
 */

const express = require('express');
const { body } = require('express-validator');
const UsuarioController = require('../controllers/usuario.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
const Validator = require('../utils/validator');

const router = express.Router();

// Validaciones comunes
const userValidations = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('correo').isEmail().withMessage('Correo inválido'),
  body('telefono').optional().isMobilePhone().withMessage('Teléfono inválido'),
  Validator.validateRequest
];

// Rutas públicas
router.post('/registro', [
  ...userValidations,
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], UsuarioController.register);

router.post('/login', [
  body('correo').isEmail().withMessage('Correo inválido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  Validator.validateRequest
], UsuarioController.login);

// Rutas protegidas
router.get('/perfil', AuthMiddleware.isAuthenticated, UsuarioController.getProfile);

router.put('/perfil', [
  AuthMiddleware.isAuthenticated,
  ...userValidations
], UsuarioController.updateProfile);

// Rutas de administrador
router.get('/', [AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin], UsuarioController.getAllUsers);

router.get('/:id', [AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin], UsuarioController.getUserById);

router.put('/:id', [
  AuthMiddleware.isAuthenticated, 
  AuthMiddleware.isAdmin,
  ...userValidations
], UsuarioController.updateUser);

router.delete('/:id', [AuthMiddleware.isAuthenticated, AuthMiddleware.isAdmin], UsuarioController.deleteUser);

module.exports = router;
