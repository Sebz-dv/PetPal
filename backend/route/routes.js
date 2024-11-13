const express = require('express');
const userController = require('../src/user/userController');
const router = express.Router();

// Rutas existentes
router.route('/user/login').post(userController.loginUserControllerFn);
router.route('/user/create').post(userController.createUserControllerFn);
router.route('/user/firstname').get(userController.getUserFirstNameControllerFn);
router.route('/user/check-email').get(userController.getCheckEmailControllerFN);
router.route('/user/:email').get(userController.getEmailControllerFN);

module.exports = router;
