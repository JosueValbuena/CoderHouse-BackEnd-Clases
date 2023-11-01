 import { Router } from 'express';

// Clase para enroutar usuarios

class UserRouter {
    constructor() {
        this.router = Router();
        this.router.use(this.middleware);
        this.router.get('/', this.getGomePage);
        this.router.get('/profile', this.getProfile);
    };

    middleware(req, res, next) {
        console.log('Middleware de usuario');
    };

    getGomePage(req, res) {
        res.send('Pagina de inicio');
    };

    getProfile(req, res) {
        res.send('Pagina del perfil');
    };
};

const userRouter = new userRouter();

app.use('/usuarios', userRouter.router);