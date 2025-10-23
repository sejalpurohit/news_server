const { getUsersQuery } = require("../models/getUsers.model");

exports.getUsers = (req, res) => {
	return getUsersQuery().then((users) => {
		res.status(200).send({ users });
	});
};
