const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
require('dotenv').config();
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const methodOverride = require("method-override");

const app = express();

app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "GLA1",
    password: process.env.PASSWORD
})
function getRandomUser() {
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

// let q = `INSERT INTO user (id,username,email,password) VALUES ?`;

// connection.query(q, [data], (err, result) => {
//     if (err) throw err;
//     console.log(result);

// })

app.get("/", (req, res) => {
    let q = "SELECT COUNT(*) AS total FROM user";

    connection.query(q, (err, result) => {
        if (err) {
            console.log("DB ERROR");
            return res.send("DATABASE ERROR")
        }
        let count = result[0].total;
        res.render("home.ejs", { count });
    })
})
app.get("/user/add", (req, res) => {
    res.render("add.ejs");
})
app.post("/user/add", (req, res) => {
    let { username, email, password } = req.body;
    let id = uuidv4();
    let q = `INSERT INTO user (id,username,email,password) VALUES(?,?,?,?)`
    let values = [id, username, email, password];

    connection.query(q, values, (err, result) => {
        if (err) {
            console.log("error db");
            res.send("Database error")
        }
        else {
            res.redirect("/user")
        }
    })
})

app.get("/user", (req, res) => {
    let q = "SELECT * FROM user";

    connection.query(q, (err, users) => {
        if (err) {
            console.log("DB ERROR");
            return res.send("DATABASE ERROR")
        }
        res.render("show.ejs", { users });
    })
})

app.get("/user/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id='${id}'`;

    connection.query(q, (err, result) => {
        if (err) {
            console.log("DB error");
            return res.send("Database error")
        }
        else {
            let user = result[0];
            res.render("edit.ejs", { user })
        }
    })
})

app.patch("/user/:id", (req, res) => {
    let { id } = req.params;
    let { password: formPass, username: newUsername } = req.body;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) {
                console.log(err);
                return res.send("DB error");
            }
            let user = result[0];
            if (formPass != user.password) {
                return res.redirect("/user")
            }
            else {
                let q2 = `UPDATE user set username='${newUsername}' WHERE id='${id}'`;
                connection.query(q2, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.send("Update error");
                    }
                    res.redirect("/user")
                })
            }
        })
    } catch (err) {
        console.log(err);
        res.send("DB error")
    }
})

app.delete("/user/:id", (req, res) => {
    const { id } = req.params;
    let q = `DELETE FROM user WHERE id='${id}'`;

    connection.query(q, (err, result) => {
        if (err) {
            console.log("Error db");
            return res.send("error");
        }
        res.redirect("/user");
    })
})
app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);

})

// if i want to insert two or more data at at time [[],[]] and connection me [user]
