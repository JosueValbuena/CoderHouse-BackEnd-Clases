const usersModel = require("../models/users.models.js");

class User {

    getUsers = async () => {
        try {
            let users = await usersModel.find()
            return users;
        } catch (error) {
            constole.log(error.message);
            return null
        };
    };

    getUserById = async (id) => {
        try {
            let user = await usersModel.findOne({ _id: id });
            return user;
        } catch (error) {
            constole.log(error.message);
            return null
        };
    };

    saveUser = async (user) => {
        try {
            let result = await usersModel.create(user);
            return result;
        } catch (error) {
            constole.log(error.message);
            return null
        };
    };

    updateUser = async (id, user) => {
        try {
            let result = await usersModel.updateOne({ _id: id }, { $set: user });
            return result;
        } catch (error) {
            constole.log(error.message);
            return null
        };
    };
};

module.exports = User;