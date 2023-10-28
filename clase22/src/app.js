import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import cors from 'cors';

const app = express();

const users = [
    {
        id: 1,
        email: 'josue@email.com',
        password: 'asdfg'
    }
];

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'Secret-key'
};

passport.use(
    new JWTStrategy(jwtOptions, (jwt_payload, done) => {
        const user = users.find(ele => ele.email === jwt_payload.email);

        if (!user) {
            return done(null, false, { message: 'usuario no encontrado' })
        };

        return done(null, user);
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors());

//Ruta autenticacion con JWT

app.get('/', (req, res) => {
    res.send('Hola')
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(ele => ele.email === email);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'error de autenticacion' })
    };

    const token = jwt.sign({ email }, 'Secret-key', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    console.log({ email, password, token });
    res.json({ token });
});

app.listen(3000, () => {
    console.log('Server Started')
});