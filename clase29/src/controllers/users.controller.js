const User = require('../dao/classes/users.dao.js');

const userServices = new User();

const getUsers = async (req, res) => {
    let result = await userServices.getUsers();
    res.send({ status: 'success', result: result });
};

const getUsersById = async (req, res) => {
    const { uid } = req.params;
    let result = await userServices.getUsersById(uid);
    res.send({ status: 'success', result });
};

const saveUser = async (req, res) => {
    const user = req.body;
    let result = await userServices.saveUser(user);
    res.send({ status: 'success', result });
};

module.exports = {
    getUsers,
    getUsersById,
    saveUser
}