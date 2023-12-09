const express = require('express');
const {
    //devLogger,
    loggerMiddleware,
    prodLogger,
    logger
} = require('./utils/logger');
const port = 3001;
const app = express();

/* devLogger.error('Error');
devLogger.warn('Warning');
devLogger.info('Info');
devLogger.http('Http');
devLogger.verbose('verbose');
devLogger.silly('silly'); */

//prodLogger.error('Error')

logger.error('Error')

app.use(loggerMiddleware);

app.get('/', async (req, res) => {
    req.logger.error('Error');
    res.send('Express')
})

//artillery
// npm install -g artillery
// npm artillery -v (verificar la version de artillery instalada)

app.get('/calculosimple', async (req, res) => {
    let num = 0;

    for (let i = 0; i < 100000; i++) {
        num += i
    };
    res.send({ num });
});

app.get('/calculocomplejo', async (req, res) => {
    let num = 0;

    for (let i = 0; i < 5e7; i++) {
        num += i
    };
    res.send({ num })
});

app.listen(port, () => {
    console.log(`server started on port ${port}`);
})