const faker = require('@faker-js/faker');

faker.location = 'es';

const generateUser = () => {
    let numOfProducts = 10;
    let products = [];
    for (let i = 0; i < numOfProducts; i++) {
        products.push(generateProducts());
    }

    return {
        name: faker.person.fisrtName(),
        last_name: faker.person.lastName(),
        gender: faker.persona.gender()
    }
};

const generateProducts = () => {
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price()
    }
};

module.exports = {
    generateUser,
    generateProducts
}