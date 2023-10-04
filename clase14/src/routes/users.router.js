const express = require('express');
const { userModel } = require('../models/user.model');

const userRouter = express.Router();

//get
userRouter.get("/api/users", async (req, res) => {
    try {
        let users = await userModel.find();
        res.send({ result: 'success', payload: users });
    } catch (error) {
        console.log(error)
    }
})

//post
userRouter.post('/api/users', async (req, res) => {
    try {
        let { nombre, apellido, email } = req.body;

        if (!nombre || !apellido || !email) {
            res.send({ status: 'error', error: 'Faltan Datos' });
            return
        }

        let result = await userModel.create({ nombre, apellido, email });
        res.send({ result: 'success', payload: result });

    } catch (error) {
        console.log(error)
    }
})

//put
userRouter.put('/api/users/:uid', async (req, res) => {
    let { uid } = req.params;

    let userToReplace = req.body;

    if (!userToReplace.nombre || !userToReplace.apellido || !userToReplace.email) {
        res.send({ status: 'error', error: 'Faltan datos' });
        return
    }

    let result = await userModel.updateOne({ _id: uid }, userToReplace);
    res.send({ result: 'success', payload: result });
})

//delete
userRouter.delete('/api/users/:uid', async (req, res) => {
    let { uid } = req.params;
    let result = await userModel.deleteOne({_id: uid});
    res.send({result: 'success', payload: result});
})

module.exports = userRouter;