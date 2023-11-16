const express = require('express');
const usersRouter = express.Router();

const usersController = require('../controlers/usersController.js');

//rutas de juguetes
usersRouter.get('/', usersController.getAllUsers);
usersRouter.post('/', usersController.createUser);

module.exports = usersRouter;