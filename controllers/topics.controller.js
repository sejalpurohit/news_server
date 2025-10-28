const {
	getTopicsQuery,
	checkTopicExistQuery,
} = require("../models/topics.model");

exports.getTopics = (req, res) => {
	return getTopicsQuery().then((topics) => {
		res.status(200).send({ topics });
	});
};

exports.checkTopicExist = (topic) => {
	return checkTopicExistQuery(topic).then((topicExist) => {
		return topicExist;
	});
};
