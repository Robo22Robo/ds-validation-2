

const express = require('express');
const app = express();
const { check, validationResult } = require("express-validator")

app.use(express.json())
app.use(express.urlencoded())


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get("/register", (req, res) => {
    const strForm = `
    <h1>Register</h1>
    <form action="/register" method="POST">
    <label for="Email">Email</label>
 
    <input type="email" name="email" id="email" />
    <br>
    <label for="Password">Password  (min 4, max 10)</label>
    <input type="password" name="password" id="password" />
    <button type ="submit">Register</button>
    
    </form>
    `
    res.send(strForm);
})


app.post("/register",
    check("email").isEmail(),
    check("password").isLength({ min: 4, max: 10 }),
    (req, res) => {
        const errors = validationResult(req)
        console.log(req.body)

        if (errors.isEmpty()) {
            return res.send(req.body)
        }

        res.send(errors);
    })


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});