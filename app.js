const express = require("express");
const mongoose = require("mongoose");

const Blog = require("./models/blog");
const app = express();
// mongodb://mongo:tiger@localhost:27017/?authMechanism=DEFAULT
const uri = "mongodb://mongo:tiger@localhost:27017/node_blog?authSource=admin";
mongoose
    .connect(uri)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/save-blog", (req, res) => {
    const blog = new Blog({
        title: "Blog Title",
        snippet: "Blog Snippet",
        body: "Blog Body abcxyzzz",
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err));
});
