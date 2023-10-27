import express from 'express';
import { createHash, isValidPassword, generateToken, authToken } from './utils/utils.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import session from 'express-session';
import routes from './routes/index.routes.js';
import handlebars from 'express-handlebars';
import { __dirname, path } from './utils/utils.js'
import mongoose from 'mongoose';

dotenv.config();

const port = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        ttl: 10
    }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

/* const connection = mongoose.connect(process.env.MONGO_URL);
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
})) */

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'handlebars');

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

app.use('/', routes);

const users = [];

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const isExist = users.find(user => user.email === email);

    if (isExist) return res.status(400).send({ error: 'error', message: 'Usuario ya existe' });

    const newUser = {
        name,
        email,
        password
    };

    users.push(newUser);

    res.send({ status: 'success', message: 'Usuario creado' });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) return res.status(400).send({ status: 'error', error: 'credencial ivalida' });

    console.log(user);

    const access_token = generateToken(user);

    res.send({ status: 'success', access_token });
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})