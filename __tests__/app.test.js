const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../app.js");

beforeEach(() => {
	return seed(data);
});

afterAll(() => {
	return db.end();
});

describe("Testing /api/topics", () => {
	test("200: Respond with the requested Topics array of topic objects", () => {
		return request(app)
			.get("/api/topics")
			.then(({ text }) => {
				const parsedData = JSON.parse(text);
				const topicsData = parsedData.topics;

				topicsData.forEach((topic) => {
					expect(topic).toHaveProperty("topic_id");
					expect(topic).toHaveProperty("slug");
					expect(topic).toHaveProperty("description");
					expect(topic).toHaveProperty("img_url");
				});
			});
	});
});

describe("Testing /api/articles", () => {
	test("200: Respond with the requested Topics array of article objects", () => {
		return request(app)
			.get("/api/articles")
			.then(({ text }) => {
				const parsedData = JSON.parse(text);
				const articlesData = parsedData.articles;
				articlesData.forEach((article) => {
					expect(article).toHaveProperty("author");
					expect(article).toHaveProperty("title");
					expect(article).toHaveProperty("article_id");
					expect(article).toHaveProperty("article_desc");
					expect(article).toHaveProperty("topic");
					expect(article).toHaveProperty("created_at");
					expect(article).toHaveProperty("votes");
					expect(article).toHaveProperty("article_img_url");
					expect(article).toHaveProperty("comment_count");
				});
			});
	});
});

describe("Testing /api/users", () => {
	test("200: Respond with the requested Topics array of user objects", () => {
		return request(app)
			.get("/api/users")
			.then(({ text }) => {
				const parsedData = JSON.parse(text);
				const usersData = parsedData.users;
				usersData.forEach((user) => {
					expect(user).toHaveProperty("username");
					expect(user).toHaveProperty("name");
					expect(user).toHaveProperty("avatar_url");
				});
			});
	});
});

describe("Testing /api/articles/:article_id", () => {
	test("200: Respond with the requested Topics array of article objects", () => {
		return request(app)
			.get("/api/articles/3")
			.then(({ _body }) => {
				const {
					author,
					title,
					article_id,
					body,
					topic,
					created_at,
					votes,
					article_img_url,
				} = _body.article;
				expect(article_id).toBe(3);
				expect(typeof author).toBe("string");
				expect(typeof title).toBe("string");
				expect(typeof article_id).toBe("number");
				expect(typeof body).toBe("string");
				expect(typeof topic).toBe("string");
				expect(typeof created_at).toBe("string");
				expect(typeof votes).toBe("number");
				expect(typeof article_img_url).toBe("string");
			});
	});
});

describe("Testing /api/articles/:article_id/comments", () => {
	test("200: Respond with the requested Topics array of article objects", () => {
		return request(app)
			.get("/api/articles/1/comments")
			.then((res) => {
				const commnetsData = JSON.parse(res.text);

				const comments = commnetsData.comments;

				comments.forEach((comments) => {
					expect(comments.article_id).toBe(1);
					expect(typeof comments.comment_id).toBe("number");
					expect(typeof comments.votes).toBe("number");
					expect(typeof comments.created_at).toBe("string");
					expect(typeof comments.author).toBe("string");
					expect(typeof comments.body).toBe("string");
					expect(typeof comments.article_id).toBe("number");
				});
			});
	});
});
