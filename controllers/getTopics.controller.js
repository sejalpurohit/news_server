const { getTopicsQuery } = require("../models/getTopics.model");

exports.getTopics = (req, res) => {
	return getTopicsQuery().then((topics) => {
		res.status(200).send({ topics });
	});
};
