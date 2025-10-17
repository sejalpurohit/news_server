const db = require("../connection");
const { format } = require("node-pg-format");
const {
	convertTimestampToDate,
	transformToDictionary,
} = require("../seeds/utils");

const dropTable = () => {
	return db.query("DROP TABLE IF EXISTS comments").then(() => {
		return db.query("DROP TABLE IF EXISTS articles").then(() => {
			return db.query("DROP TABLE IF EXISTS topics").then(() => {
				return db.query("DROP TABLE IF EXISTS users");
			});
		});
	});
};

const createTables = () => {
	return db
		.query(
			"CREATE TABLE topics (topic_id SERIAL, slug VARCHAR(50) NOT NULL PRIMARY KEY, description VARCHAR(1000) NOT NULL,img_url VARCHAR(1000));"
		)
		.then(() => {
			return db
				.query(
					"CREATE TABLE users (users_id SERIAL , username VARCHAR(20) NOT NULL PRIMARY KEY, name VARCHAR(20) NOT NULL, avatar_url VARCHAR(1000));"
				)
				.then(() => {
					return db
						.query(
							`CREATE TABLE articles (article_id SERIAL PRIMARY KEY,
              title VARCHAR(200) UNIQUE,
              body TEXT NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              votes INT DEFAULT 0 ,
              article_img_url VARCHAR(1000),
              topic VARCHAR(50) NOT NULL,
              author VARCHAR(50) NOT NULL,
              FOREIGN KEY (topic) REFERENCES topics(slug) ON DELETE CASCADE ON UPDATE CASCADE,
              FOREIGN KEY (author) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE);`
						)
						.then(() => {
							return db.query(
								`CREATE TABLE comments (comment_id SERIAL NOT NULL PRIMARY KEY,
                body TEXT NOT NULL,
                votes INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                article_id INT NOT NULL,
				author VARCHAR(20),
                FOREIGN KEY (article_id) REFERENCES articles(article_id) ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY (author) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE
              );`
							);
						});
				});
		});
};

const seed = ({ topicData, userData, articleData, commentData }) => {
	return dropTable().then(() => {
		return createTables().then(() => {
			const topicFormattedData = topicData.map((topic) => [
				topic.slug,
				topic.description,
				topic.img_url,
			]);

			const formattedQuery = format(
				`INSERT INTO topics (slug , description, img_url) VALUES %L`,
				topicFormattedData
			);

			return db.query(formattedQuery).then(() => {
				const formattedUserdata = userData.map((user) => [
					user.username,
					user.name,
					user.avatar_url,
				]);

				const userFormattedQuery = format(
					`INSERT INTO users (username,name,avatar_url ) VALUES %L`,
					formattedUserdata
				);

				return db
					.query(userFormattedQuery)
					.then(() => {
						const formattedArticleData = articleData
							.map(convertTimestampToDate)
							.map((article) => [
								article.title,
								article.body,
								article.created_at,
								article.votes,
								article.article_img_url,
								article.topic,
								article.author,
							]);

						const articleFormattedQuery = format(
							`INSERT INTO articles (title,body,created_at ,votes,article_img_url,topic,author) VALUES %L RETURNING *`,
							formattedArticleData
						);

						return db.query(articleFormattedQuery);
					})
					.then(({ rows }) => {
						const article_id_title_data = transformToDictionary(
							rows,
							"title",
							"article_id"
						);

						const formattedCommentData = commentData
							.map(convertTimestampToDate)
							.map((comment) => [
								comment.body,
								comment.votes,
								comment.created_at,
								article_id_title_data[comment.article_title],
								comment.author,
							]);

						const formattedCommentQuery = format(
							`INSERT INTO comments (body,votes, created_at,article_id,author) VALUES %L`,
							formattedCommentData
						);

						return db.query(formattedCommentQuery);
					});
			});
		});
	});
};

module.exports = seed;
