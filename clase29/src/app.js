const express = require('express');
const mongoose = require('mongoose');
const router = require('./router/index.router.js');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoEnviroment = async () => {
    try {
        await mongoose.connect('mongodb+srv://joshvlbn:CoderHouse@cluster0.zsltmgd.mongodb.net/CoderHouse-BackEnd-Clase29');
        console.log('Conectado a mongoose');
    } catch (error) {
        console.timeLog('Error al conectar a mongoose: ' + error.message);
    };
};

mongoEnviroment();

app.use('/', router);

app.listen(port, () => {
    console.log('Server started on port' + port);
});