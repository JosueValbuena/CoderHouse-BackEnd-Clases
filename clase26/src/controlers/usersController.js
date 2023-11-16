const usersService = require('../services/usersService.js');

// obetener usuarios

function getAllUsers(req, res) {
    const users = usersService.getAllUsers();
    res.json(users);
};
 
//crear usuario

function createUser(req, res) {
    const newUser = req.body;
    usersService.createUser(newUser);
    res.status(201).json(newUser);
};

module.exports = {
    getAllUsers,
    createUser
}