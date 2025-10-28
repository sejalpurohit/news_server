const router = require("express").Router();

const {
	getArticles,
	getArticlesById,
	updateVotesByArticleId,
	postArticle,
} = require("../controllers/articles.controller");

const {
	getCommentsByArticleId,
	postCommentByArticleId,
} = require("../controllers/comments.controller");

router.get("/", getArticles);
router.get("/:article_id", getArticlesById);

router.get("/:article_id/comments", getCommentsByArticleId);

router.post("/:article_id/comments", postCommentByArticleId);

router.patch("/:article_id", updateVotesByArticleId);

router.post("/", postArticle);

module.exports = router;
