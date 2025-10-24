const { getCommentsByIdQuery } = require("../models/comments.model");

exports.getCommentsByArticleId = (req, res) => {
	const { article_id } = req.params;
	return getCommentsByIdQuery(article_id).then((comments) => {
		res.status(200).send({ comments });
	});
};
