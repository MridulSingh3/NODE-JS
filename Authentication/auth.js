const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    res.json({ message: "user created" })
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid password" });

    req.session.user = {
        id: user._id,
        email: user.email
    };

    res.json({ message: "Login successful" });
});

router.get("/profile", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "Unauthorized" });
    }

    res.json({ user: req.session.user });
});

router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Logged out" });
    });
});

module.exports = router;