const toysService = require('../services/toysService.js');

//obtener juguetes

function getAllToys(req, res) {
    try {
        const toys = toysService.getAllToys();
        res.json(toys);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener juguetes' });
    }
};

//crear juguete

function createToy(req, res) {
    try {
        const newToy = req.body;
        toysService.createToy(newToy);
        res.status(201).json(newToy);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar juguete'})
    }
};

module.exports = {
    getAllToys,
    createToy
};