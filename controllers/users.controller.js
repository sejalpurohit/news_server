const {
	getUsersQuery,
	getUserByUsernameQuery,
} = require("../models/users.model");

exports.getUsers = (req, res) => {
	return getUsersQuery().then((users) => {
		res.status(200).send({ users });
	});
};

exports.getUserByUsername = (req, res) => {
	const { username } = req.params;

	return getUserByUsernameQuery(username).then((user) => {
		res.status(200).send({ user });
	});
};

exports.checkUserExist = (author) => {
	return getUserByUsernameQuery(author).then((checkUser) => {
		if (!checkUser) return false;
		else return true;
	});
};
