const express = require('express');
const router = require('./routes/users.js');
const port = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', router);

app.listen(port, () => {
    console.log(`server started on port ${port}`)
});