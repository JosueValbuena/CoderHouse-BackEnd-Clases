const express = require('express');
const http = require("http");
const socketIo = require('socket.io');
const path = require('path');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//configuracion de handlebars
app.engine('handlebars', handlebars.engine());
//Carpeta de vista
app.set('views', path.join(__dirname, 'views'));
//Establecer handlebars como motor de plantillas
app.set('view engine', 'handlebars');
//Archivos publicos
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.render('index.hbs')
})

const users = [];

//configuracion socket.io
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');
    socket.on('newUser', (username) => {
        users[socket.id] = username;
        io.emit('userConnected', username);
    })

    socket.on('chatMessage', (message) => {
        const username = users[socket.id];
        io.emit('message', { username, message })
    })

    socket.on('diconnect', (message) => {
        const username = users[socket.id];
        delete users[socket.id];
        io.emit("userDisconnected", username)
    })
})

server.listen(PORT, () => {
    console.log("Server started on port " + PORT)
});