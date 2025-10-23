const db = require("../db/connection");

function getArticles() {
	return (req, res) => {
		return db
			.query(
				`SELECT articles.article_id, articles.title, articles.body AS article_desc, articles.created_at, articles.votes, articles.article_img_url, articles.topic, articles.author, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id`
			)
			.then(({ rows }) => {
				res.status(200).send({ articles: rows });
			});
	};
}

function getArticlesById() {
	return (req, res) => {
		const { article_id } = req.params;
		return db
			.query(`SELECT  * FROM articles WHERE article_id = $1`, [article_id])
			.then(({ rows }) => {
				res.status(200).send({ article: rows[0] });
			});
	};
}

module.exports = { getArticles, getArticlesById };
