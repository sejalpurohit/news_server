const db = require("../db/connection");

function getUsers() {
	return (req, res) => {
		return db.query(`SELECT * FROM users`).then(({ rows }) => {
			res.status(200).send({ users: rows });
		});
	};
}

module.exports = getUsers;
