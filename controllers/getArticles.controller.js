const {
	getArticlesQuery,
	getArticleByIdQuery,
} = require("../models/getArticles.model");

exports.getArticles = (req, res) => {
	return getArticlesQuery().then((articles) => {
		res.status(200).send({ articles });
	});
};

exports.getArticlesById = (req, res) => {
	const { article_id } = req.params;
	return getArticleByIdQuery(article_id).then((article) => {
		res.status(200).send({ article });
	});
};
