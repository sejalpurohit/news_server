const router = require("express").Router();

const {
	deleteCommentByid,
	updateVotesByCommentId,
} = require("../controllers/comments.controller");

router.delete("/:comment_id", deleteCommentByid);
router.patch("/:comment_id", updateVotesByCommentId);

module.exports = router;
