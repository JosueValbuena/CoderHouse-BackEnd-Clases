const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');

const app = express();

const PORT = process.env.PORT || 3001;

app.engine("handlebars", handlebars.engine());

app.set("views", path.join(__dirname, '../views'));

app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res) => {
    let testUser = {
        name: "Daniel",
        last_name: "Diaz"
    }
    res.render("index", testUser);
});

app.listen(PORT, () => {
    console.log("Server started on port " + PORT)
});