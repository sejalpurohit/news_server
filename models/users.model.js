const db = require("../db/connection");

exports.getUsersQuery = () => {
	return db.query(`SELECT * FROM users`).then(({ rows }) => {
		return rows;
	});
};

exports.checkUserExistQuery = (username) => {
	return db
		.query(`SELECT * FROM users WHERE username = $1`, [username])
		.then(({ rows }) => {
			return rows;
		});
};
