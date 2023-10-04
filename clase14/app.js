const express = require('express');
const { default: mongoose } = require('mongoose');
const userRouter = require('./src/routes/users.router');

const app = express();

const port = 3001;

app.use(express.json());
app.use('/', userRouter);

mongoose.connect('mongodb+srv://joshvlbn:CoderHouse@cluster0.zsltmgd.mongodb.net/?retryWrites=true&w=majority')
.then(()=> {
    console.log("Conectado a la base de datos")
})
.catch(error => {
    console.error(error)
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})