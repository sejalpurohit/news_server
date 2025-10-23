const db = require("../db/connection");

exports.getUsersQuery = () => {
	return db.query(`SELECT * FROM users`).then(({ rows }) => {
		return rows;
	});
};
