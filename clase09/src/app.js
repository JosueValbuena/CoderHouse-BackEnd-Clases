const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');

const app = express();

const PORT = process.env.PORT || 3001;

const viewsRoter = require('../routers/views-router/views.router');

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, '../views'));
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"))
app.use("/", viewsRoter)

app.get("/", (req, res) => {
 res.send('Hola, clase 9')
});

app.listen(PORT, () => {
    console.log("Server started on port " + PORT)
});