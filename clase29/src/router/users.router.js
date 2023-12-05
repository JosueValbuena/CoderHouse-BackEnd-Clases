const Router = require('express').Router;
const { getUsers, getUsersById, saveUser } = require('../controllers/users.controller.js');

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:uid', getUsersById);
usersRouter.post('/', saveUser);

module.exports = usersRouter;