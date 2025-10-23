const db = require("../db/connection");
const format = require("pg-format");
function postCommentsByArticleIdQuery(comment) {
	const { body, articleId, username } = comment;

	const commentSQLQuery = format(
		"INSERT INTO comments (body,article_id,author) VALUES %L RETURNING *",
		[[body, articleId, username]]
	);

	return db
		.query(commentSQLQuery)
		.then(({ rows }) => {
			return rows[0];
		})
		.catch((err) => {
			console.log(err);
		});
}

module.exports = postCommentsByArticleIdQuery;
