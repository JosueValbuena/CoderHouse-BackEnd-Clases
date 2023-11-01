import { Router } from 'express';
import passport from 'passport';

const userRoutes = Router();

userRoutes.post('/register',
    passport.authenticate('register', { failureRedirect: '/failregister' }),
    async (req, res) => {
        res.send({ status: 'success', message: 'usuario registrao' })
    });

userRoutes.get('/failregister', async (req, res) => {
    console.log('falla de registro');
    res.send({ error: "Fallo de registro" });
});

userRoutes.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }),
    async (req, res) => {
        if (!req.user) return res.status(400).send({ status: 'error', error: 'Credenciales invalidas' })

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email
        };

        req.session.autorized = true;

        res.send({ status: 'success', payload: req.user });
    });

userRoutes.get('/faillogin', (req, res) => {
    res.send({ error: 'Login fallido' })
})

export default userRoutes;