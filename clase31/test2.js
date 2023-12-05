let userlog = 'usuario'
let passwordlog = 'code'

function login(user, password) {
    if (!user) return console.log('no se ha proporcionado usuario');
    if (!password) return console.log('no se ha proporcionado contrasenha');
    if (user !== userlog) return console.log('usuario invalida');
    if (password !== passwordlog) return console.log('usuario invalido');
    return console.log('logueado');
};

login('usuario', 'code');