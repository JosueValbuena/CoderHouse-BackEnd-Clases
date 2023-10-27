import express from 'express';
import userRoutes from './user/users.routes.js';
import viewsRouter from './views/views.router.js';
import sessionRouter from './sessions/sessions.routes.js';

const routes = express.Router();

routes.use('/api/user', userRoutes);
routes.use('/api/views', viewsRouter);
routes.use('/api/sessions', sessionRouter);

export default routes;