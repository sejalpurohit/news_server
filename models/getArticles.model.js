const db = require("../db/connection");
exports.getArticlesQuery = () => {
	return db
		.query(
			`SELECT articles.article_id, articles.title, articles.body AS article_desc, articles.created_at, articles.votes, articles.article_img_url, articles.topic, articles.author, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id`
		)
		.then(({ rows }) => {
			return rows;
		});
};

exports.getArticleByIdQuery = (id) => {
	return db
		.query(`SELECT  * FROM articles WHERE article_id = $1`, [id])
		.then(({ rows }) => {
			return rows[0];
		});
};
