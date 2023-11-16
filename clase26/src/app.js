const express = require('express');
const port = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//importar rutas

const toysRouter = require('./routes/toys.router.js');
const usersRouter = require('./routes/users.router.js');

app.use('/toys', toysRouter);
app.use('/users', usersRouter);
app.use((req, res) => {
    res.status(404).json({ error: 'ruta no encontrada' })
})

app.get('/', (req, res) => {
    res.send('Express')
})

app.listen(port, () => {
    console.log('Server started on port ' + port)
});