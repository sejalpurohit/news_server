const db = require("../db/connection");
const format = require("pg-format");

exports.getUsersQuery = () => {
	return db.query(`SELECT * FROM users`).then(({ rows }) => {
		return rows;
	});
};

exports.getUserByUsernameQuery = (username) => {
	const formattedQuery = format(`SELECT * FROM users WHERE username = %L`, [
		username,
	]);
	return db.query(formattedQuery).then(({ rows }) => {
		if (rows.length === 0) {
			return Promise.reject({ status: 404, msg: "User not Found" });
		}

		return rows[0];
	});
};
