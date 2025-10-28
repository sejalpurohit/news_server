const db = require("../db/connection");
const format = require("pg-format");

exports.getArticlesQuery = (order, sort, topic) => {
	let queryStr1 = `SELECT articles.article_id, articles.title, articles.body AS article_desc, articles.created_at, articles.votes, articles.article_img_url, articles.topic, articles.author, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id`;

	let queryStr2 = ` GROUP BY articles.article_id`;

	if (topic) {
		str = format(` WHERE articles.topic = %L`, topic);
		queryStr1 = queryStr1 + str + queryStr2;
	} else {
		if (
			!sort ||
			!["article_id", "title", "created_at", "votes", "topic"].includes(sort)
		)
			sort = "created_at";
		if (!order || !["ASC", "DESC"].includes(order.toUpperCase()))
			order = "DESC";

		const str = format(` ORDER BY %I %s`, sort, order);

		queryStr1 = queryStr1 + queryStr2 + str;
	}

	return db.query(queryStr1).then(({ rows }) => {
		return rows;
	});
};

exports.getArticleByIdQuery = (id) => {
	const formattedQuery = format(
		`SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = %L GROUP BY articles.article_id;`,
		[id]
	);

	return db.query(formattedQuery).then(({ rows }) => {
		if (rows.length === 0) {
			return Promise.reject({ status: 404, msg: "Path Not Found" });
		}
		const article = rows[0];
		article.comment_count = Number(article.comment_count);
		return article;
	});
};

exports.updateVotesByArticleIdQuery = (id, vote) => {
	return db
		.query(
			`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
			[vote, id]
		)
		.then(({ rows }) => {
			if (rows.length === 0) {
				return Promise.reject({ status: 404, msg: "Not Found" });
			}
			return rows[0];
		});
};

exports.postArticleQuery = (title, body, article_img_url, topic, author) => {
	const formattedQuery = format(
		`WITH inserted AS ( INSERT INTO articles (title, body, article_img_url, topic, author)
    VALUES %L RETURNING article_id, title, body, article_img_url,votes, topic, author, created_at )
  SELECT inserted.*, (SELECT COUNT(comment_id)::INT FROM comments 
      WHERE comments.article_id = inserted.article_id ) AS comment_count FROM inserted`,
		[[title, body, article_img_url, topic, author]]
	);

	return db.query(formattedQuery).then(({ rows }) => {
		article = rows[0];
		article.comment_count = article.comment_count;
		return article;
	});
};

exports.getArticleByTitleQuery = (title) => {
	return db
		.query(`SELECT * FROM articles WHERE title = $1`, [title])
		.then(({ rows }) => {
			return rows;
		});
};
