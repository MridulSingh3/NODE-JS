//Importing
require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const methodOverride = require("method-override");
const cors = require("cors");
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));

//Connection with MySql
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "person",
    password: process.env.PASSWORD
})

//@faker-js/faker
const getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password(),
    ];
}
let data = [];
for (let i = 1; i <= 100; i++) {
    data.push(getRandomUser());
}

// let q = `INSERT INTO user (id,username,email,password) VALUES ?`

// connection.query(q, [data], (err, result) => {
//     if (err) throw err;
//     console.log(result);
// })

// connection.end();

//Show Count
app.get("/", (req, res) => {
    let q = `SELECT COUNT(*) AS total FROM user`;

    connection.query(q, (err, result) => {
        if (err) throw res.status(500).json(err);
        res.json({ count: result[0].total });
    })
})

//Show user
app.get("/user", (req, res) => {
    let q = `SELECT * FROM user`;
    connection.query(q, (err, users) => {
        if (err) throw res.status(500).json(err);
        res.json(users);
    })
})

//Add Routes
app.post("/user/add", (req, res) => {
    let { username, email, password } = req.body;
    const id = uuidv4();
    let q = `INSERT INTO user (id,username,email,password) VALUES (?,?,?,?)`;
    let value = [id, username, email, password];

    connection.query(q, value, (err, result) => {
        if (err) throw res.status(500).json(err);
        res.json({ message: "User Added Succesafully" })
    })

})

//Edit Routes
app.get("/user/:id/edit", (req, res) => {
    const { id } = req.params;
    let q = `SELECT * FROM user WHERE id='${id}'`;

    connection.query(q, (err, result) => {
        if (err) throw res.status(500).json(err);
        res.json(result[0]);
    })
})

//Edit Route
app.patch("/user/:id", (req, res) => {
    const { id } = req.params;
    let { username, password } = req.body;

    let q = `UPDATE user SET username=? WHERE id=? AND password=?`;

    connection.query(q, [username, id, password], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.affectedRows === 0) {
            return res.json({ message: "Wrong password" });
        }

        res.json({ message: "Updated successfully" });
    });
});

//DELETE ROUTE
app.delete("/user/:id", (req, res) => {
    const { id } = req.params;

    let q = `DELETE FROM user WHERE id='${id}'`;
    connection.query(q, (err, result) => {
        if (err) throw res.status(500).json(err);
        res.json({ message: "Deleted Successfully" })
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT} port`);
})