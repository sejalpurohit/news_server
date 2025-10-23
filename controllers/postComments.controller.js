const postCommentsByArticleIdQuery = require("../models/postComments.model");

exports.postCommentByArticleId = (req, res) => {
	const { article_id } = req.params;

	const newcomment = req.body;
	newcomment.articleId = article_id;

	return postCommentsByArticleIdQuery(newcomment).then((comment) => {
		res.status(201).send({ comment });
	});
};
