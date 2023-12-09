const winston = require('winston');
const dotenv = require('dotenv');
dotenv.config();

//forma clasica en desarrollo
const devLogger = winston.createLogger({
    level: 'silly',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console()
    ]
});

//forma clasica en produccion
const prodLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'Infor.log' })
        //se puede configurar los trnasport para manejar niveles especificos, ejem
        // new winston.transports.File({ filename: Errors.log, level: 'error'})
    ]
});

//forma middleware

const loggerMiddleware = (req, res, next) => {
    req.logger = logger;
    next();
}

const logger = process.env.ENV === 'PRODUCTION' ? prodLogger : devLogger;

module.exports = {
    //devLogger,
    loggerMiddleware,
    //prodLogger,
    logger
};