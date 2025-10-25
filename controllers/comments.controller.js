const {
	getCommentsByIdQuery,
	deleteCommentByidQuery,
	postCommentsByArticleIdQuery,
	updateVotesByCommentIdQuery,
} = require("../models/comments.model");

exports.getCommentsByArticleId = (req, res) => {
	const { article_id } = req.params;

	return getCommentsByIdQuery(article_id).then((comments) => {
		if (comments.length === 0) {
			return Promise.reject({ status: 404, msg: "Not Found" });
		} else {
			res.status(200).send({ comments });
		}
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

exports.postCommentByArticleId = (req, res) => {
	const { article_id } = req.params;
	const { username, body } = req.body;

	return postCommentsByArticleIdQuery(username, body, article_id).then(
		(comment) => {
			res.status(201).send({ comment });
		}
	);
};

exports.updateVotesByCommentId = (req, res) => {
	const { comment_id } = req.params;
	const { inc_votes } = req.body;

	return updateVotesByCommentIdQuery(comment_id, inc_votes).then((comment) => {
		res.status(200).send({ comment });
	});
};
