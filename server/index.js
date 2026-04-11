require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));

let posts = [
    {
        id: uuidv4(),
        name: "mridul",
        post: "i love coding"
    },
    {
        id: uuidv4(),
        name: "Jay",
        post: "My father name is mridul"
    }
]
app.get("/posts", (req, res) => {
    res.json(posts);
})

app.post("/posts/add", (req, res) => {
    const { name, post } = req.body;
    const id = uuidv4();

    posts.push({ id, name, post });

    res.json({ message: "Post Added" })
})

app.get("/posts/:id", (req, res) => {
    const { id } = req.params;

    const post = posts.find((po) => po.id === id);

    if (!post) {
        return res.status(404).json({ error: "post not found" })
    }
    res.json(post)
})

app.patch("/posts/:id", (req, res) => {
    const { id } = req.params;
    const { name, post: updatedPost } = req.body;

    const foundPost = posts.find((po) => po.id === id);

    if (!foundPost) {
        return res.status(404).json({ error: "not found" });
    }

    if (name !== undefined) foundPost.name = name;
    if (updatedPost !== undefined) foundPost.post = updatedPost;

    res.json({ message: "updated", post: foundPost });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((po) => po.id !== id);

    res.json({ message: "Deleted" });
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running in ${process.env.PORT}`);

})