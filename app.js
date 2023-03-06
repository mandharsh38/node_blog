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
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.redirect("/blogs");
});

app.get("/add-blog", (req, res) => {
    res.render("add_form");
});

app.post("/save-blog", (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            // res.send(result);
            res.redirect("/blogs");
        })
        .catch((err) => console.log(err));
});

app.get("/blogs", (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render("index", { blogs: result });
        });
});

app.get("/blog", (req, res) => {
    Blog.findById(req);
});
