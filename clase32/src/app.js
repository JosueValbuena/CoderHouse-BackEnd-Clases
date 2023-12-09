const express = require('express');
const compression = require('express-compression');
const brotliCompress = require('zlib');

const app = express();

const port = 3001;

//Diccionario errores

const ErrorTypes = {
    INVALID_PARAMS: 'INVALID_PARAMS'
}

//Middleware para manejar errores

app.use((err, req, res, next) => {
    if (err.type == ErrorTypes.INVALID_PARAMS) {
        res.status(400).json({ error: 'Parametro no valido' });
    } else {
        res.status(500).json({ error: 'Error interno del servido' });
    };
});

function validateUIParam(req, res, next) {
    const uid = req.params.uid;
    if (!/^\d+$/.text(uid)) {
        const error = new Error('uid no valido');
        error.type = ErrorTypes.INVALID_PARAMS;
        next(error);
    } else {
        next();
    };
};

app.get('/:uid', validateUIParam, async (req, res) => {
    const uid = req.params.uid;
    res.json({ message: `usuario con id ${uid}` });
});

// compression

/* app.use(compression({
    brotli: {
        enable: true, zlib: {}
    }
})); */

app.get('stringlargo', async (res, res) => {
    let string = 'Aluknos de la mision 58055';

    for (let i = 0; i < 10000; i++) {
        string += "Hi Rodrigos's friend"
    }

    brotliCompress(string, (err, compressed) => {
        if (err) {
            console.error(err);
            res.status(500).send('internal server error');
            returnl
        }

        res.set('Content-Encoding', 'br');
        res.send(compressed);
    })
    //res.sed(string);
});

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});