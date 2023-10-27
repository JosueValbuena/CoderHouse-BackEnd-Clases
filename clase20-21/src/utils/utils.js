import bcrypt from 'bcrypt';
import path, { dirname } from 'path';
import { fileURLToPath } from "url";

//funcion que recibe una contraseña y la encripta o "hashea"
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//funcion que comprueba las contraseñas encriptadas
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

//configuracion para rutas locales
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//JWT

const generateToken = (user) => {
    const token = jwt.sign({user}, process.env.JWT_PRIVATE_KEY, {expiresIn:"24h"});
    return token
}

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader) return res.status(401).send({
        error: 'No autorizado'
    });

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, credential) => {
        if(error) return res.status(403).send({error: 'No autorizado'});
        req.user = credential.user;
        next();
    });
}

export {__dirname, path}