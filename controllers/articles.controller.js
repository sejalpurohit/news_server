const {
	getArticlesQuery,
	getArticleByIdQuery,
	updateVotesByArticleIdQuery,
} = require("../models/articles.model");

exports.getArticles = (req, res) => {
	let { sort_by, order, topic } = req.query;

	return getArticlesQuery(sort_by, order, topic).then((articles) => {
		if (articles.length === 0) {
			return Promise.reject({ status: 404, msg: "Not Found" });
		} else {
			res.status(200).send({ articles });
		}
	});
};

exports.getArticlesById = (req, res) => {
	const { article_id } = req.params;

	return getArticleByIdQuery(article_id).then((article) => {
		res.status(200).send({ article });
	});
};

exports.updateVotesByArticleId = (req, res) => {
	const { article_id } = req.params;
	const { inc_votes } = req.body;

	if (typeof inc_votes !== "number") {
		res.status(400).send({ msg: "Bad Request" });
	} else {
		return updateVotesByArticleIdQuery(article_id, inc_votes).then(
			(article) => {
				res.status(200).send({ article });
			}
		);
	}
};
