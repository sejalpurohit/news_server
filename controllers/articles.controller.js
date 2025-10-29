const {
	getArticlesQuery,
	getArticleByIdQuery,
	updateVotesByArticleIdQuery,
	postArticleQuery,
	getArticleByTitleQuery,
} = require("../models/articles.model");

const { checkUserExist } = require("../controllers/users.controller");
const { checkTopicExist } = require("../controllers/topics.controller");

exports.getArticles = (req, res) => {
	let { sort_by, order, topic } = req.query;

	console.log("req query", req.url);

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

exports.checkArticleExist = (title) => {
	return getArticleByTitleQuery(title).then((article) => {
		if (article.length === 0) return true;
		else return false;
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

exports.postArticle = async (req, res) => {
	const { title, body, article_img_url, topic, author } = req.body;
	if (!topic || !author || !title) {
		return res.status(400).send({ msg: "Bad Request" });
	}

	const ifTopicExist = await checkTopicExist(topic); //should present
	const ifauthorExist = await checkUserExist(author); //should present
	const ifTitleExist = await this.checkArticleExist(title); //should  not present

	if (!ifTopicExist) {
		return res.status(404).send({ msg: "Topic not Found" });
	} else if (!ifauthorExist) {
		return res.status(404).send({ msg: "User not Found" });
	} else if (!ifTitleExist) {
		return res.status(404).send({ msg: "Title already Exist" });
	} else {
		return postArticleQuery(title, body, article_img_url, topic, author).then(
			(article) => {
				res.status(201).send(article);
			}
		);
	}
};
