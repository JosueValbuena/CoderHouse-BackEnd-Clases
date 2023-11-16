const toysData = require('../models/toys.model.js');

function getAllToys() {
    try {
        return toysData.getAllToys();
    } catch (error) {
        throw new Error('Error al obtener juguetes desde el servicio', error);
    }
};

function createToy(newToy) {
    try {
        toysData.createToy(newToy);
    } catch (error) {
        throw new Error('Error al agregar juguete al servicio')
    }
};

module.exports = {
    getAllToys,
    createToy
};