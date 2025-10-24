exports.handleDefaultError = (req, res) => {
	res.status(404).send({ msg: "Not Found" });
};

exports.handlePsqlError = (err, req, res, next) => {
	if (err.code === "22P02") {
		res.status(400).send({ msg: "Bad Request" });
	}
	if (err.status === "23503") {
		res.status(400).send({ msg: "Forbidden to make this request" });
	}
	next(err);
};

exports.handleCustomError = (err, req, res, next) => {
	if (err.status && err.msg) {
		res.status(err.status).send({ msg: err.msg });
	}
	next(err);
};

exports.handleServerError = (err, req, res, next) => {
	res.status(500).send({ msg: "Internal Server Error" });
};
