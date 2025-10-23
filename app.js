const express = require("express");
const app = express();

const db = require("./db/connection");
const getTopics = require("./controllers/getTopics.controller");
const {
	getArticles,
	getArticlesById,
} = require("./controllers/getArticles.controller");
const getUsers = require("./controllers/getUsers.controller");
const getCommentsByArticleId = require("./controllers/getComments.controller");
const postCommentByArticleId = require("./controllers/postComments.controller");

app.use(express.json());
app.get("/", (req, res) => {
	res.status(200).send({ msg: "Hello from Express Server" });
});

app.get("/api/topics", getTopics());

app.get("/api/articles", getArticles());

app.get("/api/users", getUsers());

app.get("/api/articles/:article_id", getArticlesById());

app.get("/api/articles/:article_id/comments", getCommentsByArticleId());

app.post("/api/articles/:article_id/comments", postCommentByArticleId());

module.exports = app;
