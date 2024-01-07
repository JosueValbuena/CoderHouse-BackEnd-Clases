const cluster = require('cluster');
const { cpus } = require('os');
const express = require('express');
const port = 3001;
const nummeroDeProcesadores = cpus().length;
console.log(nummeroDeProcesadores);

if (cluster.isPrimary) {
    console.log('Proceso principal');
    for (let i = 0; i < nummeroDeProcesadores; i++) {
        cluster.fork()
    };
} else {
    console.log('Proceso Forkeado, ahora se transforma en un worker');
    console.log(`${process.pid}`);
    const app = express();

    app.get('/operacionsencilla', async (req, res) => {
        let sum = 0;
        for (let i = 0; i < 100000; i++) {
            sum += 1;
        }
        res.send({ status: 'Success', message: `Peticion atentidad por worker - ${process.pid} - ${sum}` });
    });

    app.get('/operacioncompleja', async (req, res) => {
        let sum = 0;
        for (let i = 0; i < 5e9; i++) {
            sum += 1;
        }
        res.send({ status: 'Success', message: `Peticion atentidad por worker - ${process.pid} - ${sum}` });
    });

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
};