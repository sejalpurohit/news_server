const {
	getCommentsByIdQuery,
	deleteCommentByidQuery,
} = require("../models/comments.model");

exports.getCommentsByArticleId = (req, res) => {
	const { article_id } = req.params;
	return getCommentsByIdQuery(article_id).then((comments) => {
		res.status(200).send({ comments });
	});
};

exports.deleteCommentByid = (req, res) => {
	const { comment_id } = req.params;

	return deleteCommentByidQuery(comment_id).then((deleted) => {
		if (deleted === 0) {
			res.status(404).send({ msg: "Not Found" });
		}
		if (deleted === 1) {
			res.status(204).send({ msg: "Comment deleted Successfully" });
		}
	});
};
