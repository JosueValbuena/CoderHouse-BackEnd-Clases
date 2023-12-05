const mongoose = require('mongoose');

const collection = 'Users';

const schema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    role: String,
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Orders'
        }
    ]
})

const usersModel = mongoose.model(collection, schema);

module.exports = usersModel;