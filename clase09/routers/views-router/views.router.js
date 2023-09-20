const express = require('express');
const viewsRoter = express();

const food = [
    {
        name: "pineaple",
        price: 4990
    },
    {
        name: "banana",
        price: 3990
    },
    {
        name: "apple",
        price: 1990
    },
    {
        name: "strawberry",
        price: 4490
    },
    {
        name: "watermelon",
        price: 2490
    }
]

let testUser = [
    {
        name: "Daniel",
        last_name: "Diaz",
        age: 18,
        email: "daniel@email.com",
        phone: 12345,
        rol: "admin"
    },
    {
        name: "Javiera",
        last_name: "Martinez",
        age: 19,
        email: "javiera@email.com",
        phone: 23456,
        rol: "admin"
    },
    {
        name: "Alicia",
        last_name: "Fernandez",
        age: 20,
        email: "alicia@email.com",
        phone: 34567,
        rol: "user"
    },
    {
        name: "Samuel",
        last_name: "Quintero",
        age: 21,
        email: "samuel@email.com",
        phone: 45678,
        rol: "user"
    },
    {
        name: "John",
        last_name: "Doe",
        age: 22,
        email: "john@email.com",
        phone: 56789,
        rol: "user"
    },
]

viewsRoter.get("/food", (req, res) => {
    const index = Math.floor(Math.random() * 5);
    res.render("index", testUser[index]);
})

module.exports = viewsRoter;