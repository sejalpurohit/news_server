const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controller");
const {
	getArticles,
	getArticlesById,
	updateVotesByArticleId,
} = require("./controllers/articles.controller");
const { getUsers } = require("./controllers/users.controller");
const {
	getCommentsByArticleId,
	deleteCommentByid,
} = require("./controllers/comments.controller");
const {
	postCommentByArticleId,
} = require("./controllers/postComments.controller");

const {
	handleDefaultError,
	handlePsqlError,
	handleCustomError,
	handleServerError,
} = require("./controllers/error.controller");

app.use(express.json());
app.get("/", (req, res) => {
	res.status(200).send({ msg: "Hello from Express Server" });
});

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

app.get("/api/articles/:article_id", getArticlesById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.patch("/api/articles/:article_id/", updateVotesByArticleId);
app.delete("/api/comments/:comment_id", deleteCommentByid);

app.use(handleDefaultError);

app.use(handlePsqlError);

app.use(handleCustomError);

app.use(handleServerError);

module.exports = app;
