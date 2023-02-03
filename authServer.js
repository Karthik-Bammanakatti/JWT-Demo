require('dotenv').config()

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')

app.listen("3000", () => { console.log("Connected : Auth server is running on port 3000") });
app.use(express.json());

var refreshTokens = []

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (!refreshToken) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(401)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const token = generateAuthToken({ name: user.name })
        res.json({ accessToken: token })
    })
})

app.post('/login', (req, res) => {
    const username = req.body.name;
    const user = { name: username }
    const accessToken = generateAuthToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken);
    res.json({
        accessToken: accessToken,
        refreshToken: refreshToken
    })
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(201)
})

function generateAuthToken(user) {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '180s' });
    return token;
}
