const db = require("../db/connection");

function getCommentsByArticleId() {
	return (req, res) => {
		const { article_id } = req.params;
		return db
			.query(`SELECT  * FROM comments WHERE article_id = $1`, [article_id])
			.then(({ rows }) => {
				res.status(200).send({ comments: rows });
			});
	};
}

module.exports = getCommentsByArticleId;
