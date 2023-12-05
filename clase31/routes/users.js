const Router = require('express').Router;
const { generateUser } = require('../utils.js');

const router = Router();

router.get('/', async (req, res) => {
    let users = [];

    for (let i = 0; i < users.length; i++) {
        users.push(generateUser());
    };

    res.send({ status: 'success', payload: users });
});

module.exports = router;