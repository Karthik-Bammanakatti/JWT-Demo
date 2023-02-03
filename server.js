require('dotenv').config()

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')


app.listen("8080", () => { console.log("Connected : Server is running on port 8080") });
app.use(express.json());


const teamMates = [{
    name: "Karthik",
    age: 23,
    role: "Junior developer",
    skills: ["Azure development", "C#", "HTML", "CSS", "Javascript", "Python"]
}, {
    name: "Abhijit",
    age: 24,
    role: "Junior developer",
    skills: ["Azure development", "C#", "Python"]
}, {
    name: "Sridhar",
    age: 29,
    role: "Senior developer",
    skills: ["Azure development", "C#", "Javascript", "Python"]
}];



app.get('/users', authenticateToken, (req, res) => {
    const users = teamMates.filter(teamMate => teamMate.name === req.user.name);
    res.send(users)
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}