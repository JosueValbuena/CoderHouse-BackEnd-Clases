import bcrypt from 'bcrypt';

//funcion que recibe una contraseña y la encripta o "hashea"
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//funcion que comprueba las contraseñas encriptadas
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);