const usersData = require('../models/toys.model.js');

function getAllUsers() {
    return usersData.getAllusers();
};

function createUser(newUser) {
    usersData.createuser(newUser);
};

module.exports = {
    getAllUsers,
    createUser
};