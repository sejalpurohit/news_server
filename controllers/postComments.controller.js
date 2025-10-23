const postCommentsByArticleIdQuery = require("../models/postComments.model");

function postCommentByArticleId() {
	return (req, res) => {
		const { article_id } = req.params;

		const newcomment = req.body;
		newcomment.articleId = article_id;

		return postCommentsByArticleIdQuery(newcomment).then((comment) => {
			res.status(201).send({ comment });
		});
	};
}

module.exports = postCommentByArticleId;
