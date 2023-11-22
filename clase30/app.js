const express = require('express');
const nodeMailer = require('nodemailer');

const app = express();

const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//configurar el transporte Nodemailer

const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'joshvlbn@gmail.com',
        pass: 'qnji rerd rmyx ioac'
    }
});

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/enviar', async (req, res) => {
    const { nombre, email, message } = req.body;

    const mailOptions = {
        from: 'joshvlbn@gmail.com',
        to: ['joshvalbuena@hotmail.com'],
        subject: 'Correo de prueba',
        text: `Nombre: ${nombre}\n Correo: ${email}\n Mensaje: ${message}`,
        attachments: [{
            filename: 'img.jpeg',
            path: __dirname+'/img.jpeg',
            cid: 'img'
        }]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error al enviar correo');
        }else{
            console.log('Correo enviado');
            res.send('Correo enviado')
        };
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});