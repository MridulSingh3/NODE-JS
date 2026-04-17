const mongoose = require('mongoose');
const Chat = require("./models/Chat");

main().then(() => { console.log("MongoDB Connect Successfully") })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Lion')
}

const chats = [
    {
        from: "Mridul Singh",
        to: "Priya Sharma",
        msg: "Hello Priya, how are you?",
        created_at: new Date()
    },
    {
        from: "Rahul Verma",
        to: "Anjali",
        msg: "Meeting kab hai?",
        created_at: new Date()
    },
    {
        from: "Amit",
        to: "Rohit",
        msg: "Kal cricket khelenge?",
        created_at: new Date()
    },
    {
        from: "Neha",
        to: "Simran",
        msg: "Assignment complete ho gaya?",
        created_at: new Date()
    },
    {
        from: "Sahil",
        to: "Mridul Singh",
        msg: "Bro notes bhej de",
        created_at: new Date()
    }
];

Chat.insertMany(chats);
