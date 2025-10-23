const db = require("../db/connection");

function getTopics() {
	return (req, res) => {
		return db.query(`SELECT * FROM topics`).then(({ rows }) => {
			res.status(200).send({ topics: rows });
		});
	};
}

module.exports = getTopics;
