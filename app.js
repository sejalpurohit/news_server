const express = require("express");
const app = express();
const articleRoute = require("./routes/atricles.api");
const userRoute = require("./routes/user.api");
const topicRoute = require("./routes/topics.api");
const commentRoute = require("./routes/comments.api");
const defaultRoute = require("./routes/default.api");

const {
	handleDefaultError,
	handlePsqlError,
	handleCustomError,
	handleServerError,
} = require("./controllers/error.controller");

const router = express.Router();
app.use(router);

app.use(express.json());

app.use("/api", defaultRoute);

//articles
app.use("/api/articles", articleRoute);
app.use("/api/comments", commentRoute);
app.use("/api/topics", topicRoute);
app.use("/api/users", userRoute);

app.use(handleDefaultError);
app.use(handlePsqlError);
app.use(handleCustomError);
app.use(handleServerError);

module.exports = app;
