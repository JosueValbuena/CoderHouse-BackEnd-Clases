import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
dotenv.config();

const fileStoreSession = FileStore(session); //configurar el sistema de almacenamiento de sesiones
const app = express(); //instancia paranos permite crear servidor web, definir rutas, middleware y manejar solicitudes http.
const port = 8080;

app.use(cookieParser()); //middleware para interactuar con cookies de solicitudes y respuestas.
app.use(express.urlencoded({ extended: true }))

//guardado en archivo local
/* app.use(
    session({ //middleware que establece sesion para el usuario y guarda informacion en sistema de archivos.
        store: new fileStoreSession({
            path: './src/sessions', ttl: 100, retries: 0
        }), //definir directorio, tiempo de vida y numeros de acceso concurrentes.
        secret: "ClaveSecreta", //firmar las cookies de la sesion.
        resave: true, // evita el guardado inncesario de sesiones.
        saveUninitialized: false // evita el guardado inncesario de sesiones.
    })); */


//guardado en mongo
app.use(
    session({ //middleware que establece sesion para el usuario y guarda informacion en sistema de archivos.
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
            ttl: 1
        }),
        secret: process.env.SECRET_KEY, //firmar las cookies de la sesion.
        resave: false, // evita el guardado inncesario de sesiones.
        saveUninitialized: true // evita el guardado inncesario de sesiones.
    }));

app.get('/', (req, res) => {
    if (req.session.user) {
        res.send(`Hola ${req.session.user.username}`)
    } else {
        res.send('Usuario no autenticado')
    }
})

app.post('/login/:username/:password', (req, res) => {
    const { username, password } = req.params;
    const { cid } = req.body
    console.log({ username, password, cid })
    if (username == 'usuario' && password == 'coderhouse') {
        req.session.user = { username };

        res.send("Inicio de sesion exitoso.");
    } else {
        res.send("Credenciales invalidas.")
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error al cerrar sesion :' + err);
        }
        res.send('Sesion Cerrada')
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})