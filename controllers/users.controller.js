const { getUsersQuery, checkUserExistQuery } = require("../models/users.model");

exports.getUsers = (req, res) => {
	return getUsersQuery().then((users) => {
		res.status(200).send({ users });
	});
};

exports.checkUserExist = () => {
	return checkUserExistQuery().then((user) => {
		if (user.length === 0) {
			res.status(404).send({ msg: "Not Found" });
		}
	});
};
