const db = require("../db/connection");
const format = require("pg-format");

exports.getTopicsQuery = () => {
	return db.query(`SELECT * FROM topics`).then(({ rows }) => {
		return rows;
	});
};

exports.checkTopicExistQuery = (topic) => {
	const formatedQuery = format(`SELECT * FROM topics WHERE slug = %L`, [topic]);

	return db.query(formatedQuery).then(({ rows }) => {
		if (rows.length == 0) return false;
		else return true;
	});
};
