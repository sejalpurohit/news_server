const db = require("../db/connection");

exports.getCommentsByIdQuery = (id) => {
	return db
		.query(`SELECT  * FROM comments WHERE article_id = $1`, [id])
		.then(({ rows }) => {
			return rows;
		});
};

exports.deleteCommentByidQuery = (id) => {
	return db
		.query("DELETE FROM comments WHERE comment_id = $1", [id])
		.then(({ rowCount }) => {
			return rowCount;
		});
};
