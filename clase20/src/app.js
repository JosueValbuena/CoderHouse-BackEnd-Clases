import express from 'express';
import { createHash, isValidPassword } from './utils/utils';

const port = 3001; 

const app = express();

/* app.post('/register', async (req, res) => {
    const {first_name, last_name, email, age, password} = req.body;

    if(!first_name || !last_name || !email || !age || password){
        return res.status(400).send({status: '202', error: 'faltan datos'});
    };

    let user = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password)
    };

    res.json(user);

    //Buscar dentro de mongo para corroborar los datos

    const usuario = await userModel.findOne ({email: email}, {email: 1, first_name: 1, last_name:1, password:1});

    if(!isValidPassword(user, password)){
        return res.status(403).send({status: 'error', error: 'contraseña incorreta'});
    };
}) */

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})