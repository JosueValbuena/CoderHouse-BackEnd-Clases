import express, { Router } from 'express';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const pets = [];

//Middleware validacion nombre de mascota tenga letras y espacios
const validatePetName = (req, res, next) => {
    const petName = req.params.pet;

    if (/^[a-zA-Z\s]+$/.test(petName)) {
        req.petName = petName
        next()
    } else {
        res.status(400).json({ error: 'el nombre debe contener letras y espacios' });
    };
};

//Middleware para buscar mascota por el nombre
const findPetByName = (req, res, next) => {
    const pet = pets.find((ele) => ele.name === req.petName);

    if (pet) {
        req.pet = pet;
        next();
    } else {
        res.status(400).json({ error: 'Mascota no encontrada' });
    };
};

//Middleware para manejar politicas

const handlePolicies = (policies) => {
    return (req, res, next) => {
        if (policies.includes('PUBLIC')) {
            next();
        } else {
            const token = req.headers.authorization;

            if (!token) {
                return res.status(401).json({ message: 'Token no encontrado' })
            };

            try {
                const decoded = jwt.verify(token.split(' ')[1], 'secret_key');

                if (policies.includes(decoded.role)) {
                    next();
                } else {
                    return res.status(403).json({ message: 'Acceso denegado por politicas insuficientes' });
                };
            } catch (error) {
                return res.status(401).json({ message: 'Token invalido' });
            }
        }
    }
}

//Rutas de prueba de middlewares de validacion de parametros y busquerda
app.get('/:pet', validatePetName, findPetByName, (req, res) => {
    console.log(pets)
    res.json(req.pet);
})

app.post('/', (req, res) => {
    const { name, specie } = req.body;
    if (!name || !specie) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' })
    };

    const newPet = {
        name,
        specie
    };

    pets.push(newPet);

    res.status(201).json(newPet);
});

app.put('/:pet', validatePetName, findPetByName, (req, res) => {
    req.pet.adopted = true;
    res.json({ message: 'Mascota marcada como adoptada' });
});

//Rutas de sesion

const sessionRouter = Router();

sessionRouter.post('/login', (req, res) => {
    const user = { id: 1, username: 'usuario', role: 'user' };

    const token = jwt.sign(user, 'secret_key', { expiresIn: '1h' });

    res.json({ token });
});

//Rutas de usuario

const userRouter = Router();

userRouter.get('/user', handlePolicies(['user']), (req, res) => {
    res.json({ message: 'Acceso exitoso' });
});

userRouter.get('/public', handlePolicies(['PUBLIC']), (req, res) => {
    res.json({ message: 'Acceso a ruta publica exitosa' });
});


//Rutas
app.use('/session', sessionRouter);
app.use('/user', userRouter);

app.listen(3001, () => {
    console.log('Server Started')
});