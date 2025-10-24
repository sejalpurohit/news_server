const { getTopicsQuery } = require("../models/topics.model");

exports.getTopics = (req, res) => {
	return getTopicsQuery().then((topics) => {
		res.status(200).send({ topics });
	});
};
