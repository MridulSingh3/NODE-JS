const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;;
const connectToMongodb = require("./config/db");
const router = require("./routes/auth");
require("dotenv").config();

const app = express();
connectToMongodb();

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/auth-app"
    }),
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true
    }
}));

app.use("/auth", router);

app.listen(3000, () =>
    console.log("Server running on port 3000")
);