const db = require("../db/connection");

exports.getTopicsQuery = () => {
	return db.query(`SELECT * FROM topics`).then(({ rows }) => {
		return rows;
	});
};
