const express = require('express');
const path = require('path');
//const handlebars = require('express-handlebars');

const app = express();

const http = require("http").createServer(app)
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3001;

//app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

app.get("/", (req, res) => {
    res.render('index', {title: 'Aplicacion webSocket'})
})

// Agrega un endpoint para servir el cliente Socket.IO
/* app.get("/socket.io/socket.io.js", (req, res) => {
    res.sendFile(path.join(__dirname, '../node_modules/socket.io/client-dist/socket.io.js'));
}); */

http.listen(PORT, () => console.log("Server started on port " + PORT))

io.on("connection", (socket) => {
    console.log('cliente conectado');

    socket.on('mensaje', (data)=>{
        console.log('Mensaje recibido: ', + data)
        io.emit("mensaje", data);
    })

    socket.on("disconnect", ()=>{
        console.log('Cliente se ha desconectado')
    })
})