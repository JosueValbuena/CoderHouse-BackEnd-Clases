const express = require('express');
const toysRouter = express.Router();

const toysController = require('../controlers/toysController.js');

//rutas de juguetes
toysRouter.get('/', toysController.getAllToys);
toysRouter.post('/', toysController.createToy);

module.exports = toysRouter;