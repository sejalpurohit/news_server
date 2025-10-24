const { checkUserExistQuery } = require("../models/users.model");
const postCommentsByArticleIdQuery = require("../models/postComments.model");

exports.postCommentByArticleId = (req, res) => {
	const { article_id } = req.params;
	const { username, body } = req.body;

	return checkUserExistQuery(username).then((user) => {
		if (user.length === 0) {
			return Promise.reject({
				status: 403,
				msg: "Forbidden to make this request",
			});
		}

		return postCommentsByArticleIdQuery(username, body, article_id).then(
			(comment) => {
				res.status(201).send({ comment });
			}
		);
	});
};
