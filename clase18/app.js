import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
const port = 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/setCookie', (req, res) => {
    const { user } = req.body;
    res.cookie('user', user, { maxAge: 10000 });
    res.send('Cookie creada');
});

app.get('/getCookie', (req, res) => {
    const userCookie = req.cookies.user;
    console.log('cookie', userCookie);
    res.send('Cookie mostrada en consola' + userCookie)
})

app.get('/session', (req, res) => {
    if (req.session.counter) {
        req.session.counter++,
            res.send(`se ha visita el sitio ${req.session.counter} veces`);
    } else {
        req.session.counter = 1;
        res.send(`Bienvenido`);
    }
});

app.get('/loguot', (req, res) => {
    req.session.destroy(err => {
        if (!err) res.send('Logut')
        else res.send({ status: 'Log out error', body: err })
    });
});

app.get('/login', (req, res) => {
    const { username, pass } = req.query;
    if (username !== 'coder' || pass !== '12345') {
        return res.send('Autenticacion fallida');
    }

    req.session.user = username;
    req.session.admin = true;
    res.send('Ingredo exitoso');
});

const auth = (req, res, next) => {
    if (req.session.user === 'coder' && req.session.admin){
        return next()
    }
    return res.status(401).send('Error de autenticacion');
}

app.get('/login2', auth, (req, res) => {
    res.send('Eres administrador')
})

/* app.get('/setCookie', (req, res) => {
    res.cookie('CoderCookie', 'Soy la cookie', {maxAge: 10000}).send('Cookie')
})

app.get('/getCookie', (req, res) => {
    res.send(req.cookies)
})

app.get('/deleteCookie', (req, res) => {
    res.clearCookie('CoderCookie').send('Cookie eliminada')
})

app.get('/setSignedCookie', (req, res) => {
    res.cookie('Cookie firmada', 'recibo una cookie firmada', {maxAge: 10000, signed: true}).send('Cookie');
}) */

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})