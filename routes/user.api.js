const router = require("express").Router();

const {
	getUsers,
	getUserByUsername,
} = require("../controllers/users.controller");

router.get("/", getUsers);
router.get("/:username", getUserByUsername);

module.exports = router;
