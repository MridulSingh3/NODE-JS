const mongoose = require("mongoose");

async function connectToMongodb(req, res) {
    await mongoose.connect("mongodb://127.0.0.1:27017/auth-app")
    console.log("MongoDB connect");
}

module.exports = connectToMongodb;