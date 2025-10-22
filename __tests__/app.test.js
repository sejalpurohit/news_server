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

describe("Testin /api/topics", () => {
	test("200: Respond with the requested Topics array of topics object", () => {
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

describe("Testin /api/articles", () => {
	test("200: Respond with the requested Topics array of articles object", () => {
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
