const mongoose = require('mongoose');

const collection = 'Business';

const schema = new mongoose.Schema({
    name: String,
    products: []
});

const businessModel = mongoose.model(collection, schema);

module.exports = businessModel;