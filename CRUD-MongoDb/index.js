require("dotenv").config();
const mongoose = require('mongoose');
const Chat = require("./models/Chat");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

main().then(() => { console.log("MongoDB Connect Successfully") })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Lion')
}


//Index Route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats })
})

//New Post Route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs")
})

app.post("/chats", (req, res) => {
    let { from, msg, to } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    })
    newChat.save().then((res) => { console.log(res) }).catch((err) => { console.log("error occur") })
    res.redirect("/chats");
})

app.get("/chats/:id/edit", async (req, res) => {
    const { id } = req.params;
    const chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
})

app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, { msg: msg }, { runValidators: true, new: true })
    res.redirect("/chats");
})

app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletedChats = await Chat.findByIdAndDelete(id);
    console.log(deletedChats);

    res.redirect("/chats");
})

app.get("/", (req, res) => {
    res.send("Port is working")
})
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
})