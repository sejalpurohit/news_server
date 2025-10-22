const express = require("express");
const app = express();

const db = require("./db/connection");

app.get("/", (req, res) => {
	res.status(200).send({ msg: "Hello from Express Server" });
});

app.get("/api/topics", (req, res) => {
	return db.query(`SELECT * FROM topics`).then(({ rows }) => {
		res.status(200).send({ topics: rows });
	});
});

app.get("/api/articles", (req, res) => {
	return db
		.query(
			`SELECT articles.article_id, articles.title, articles.body AS article_desc, articles.created_at, articles.votes, articles.article_img_url, articles.topic, articles.author, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id`
		)
		.then(({ rows }) => {
			res.status(200).send({ articles: rows });
		});
});

module.exports = app;
