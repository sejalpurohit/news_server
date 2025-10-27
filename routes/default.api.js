const router = require("express").Router();

const { dafultController } = require("../controllers/default.controller");

router.get("/", dafultController);

module.exports = router;
