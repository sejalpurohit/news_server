const db = require("../db/connection");
const format = require("pg-format");
function postCommentsByArticleIdQuery(user_name, _body, _article_id) {
	const commentSQLQuery = format(
		"INSERT INTO comments (body,article_id,author) VALUES %L RETURNING *",
		[[_body, _article_id, user_name]]
	);

	return db.query(commentSQLQuery).then(({ rows }) => {
		if (rows.length === 0) {
			return Promise.reject({ status: 404, msg: "Bad Request" });
		}
		return rows[0];
	});
}

module.exports = postCommentsByArticleIdQuery;
