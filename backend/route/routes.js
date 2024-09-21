const express = require('express');
const userController = require('../src/user/userController'); // Asegúrate de que la ruta sea correcta
const router = express.Router();

// Rutas existentes
router.route('/user/login').post(userController.loginUserControllerFn);
router.route('/user/create').post(userController.createUserControllerFn);

// Nueva ruta para obtener un usuario por ID
router.route('/users/:email').get(userController.getUserByEmailControllerFn);

module.exports = router;
