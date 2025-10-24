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

describe("Testing GET /api/topics", () => {
	test("200: Respond with the requested Topics array of topic objects", () => {
		return request(app)
			.get("/api/topics")
			.expect(200)
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
	test("404: Respond with StatusCode: 404, Error Msg: Not Found", () => {
		return request(app)
			.get("/api/newtopic")
			.expect(404)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toBe("Not Found");
			});
	});
});

describe("Testing GET /api/articles", () => {
	test("200: Respond with the requested Topics array of article objects", () => {
		return request(app)
			.get("/api/articles")
			.expect(200)
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

describe("Testing GET /api/users", () => {
	test("200: Respond with the requested Topics array of user objects", () => {
		return request(app)
			.get("/api/users")
			.expect(200)
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

describe("Testing GET /api/articles/:article_id", () => {
	test("200: Respond with the requested Topics array of article objects", () => {
		return request(app)
			.get("/api/articles/3")
			.expect(200)
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

	test("404: Respond with Status code: 404 Error Msg:Path Not Found`", () => {
		return request(app)
			.get("/api/articles/19")
			.expect(404)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toBe("Path Not Found");
			});
	});
	test("400: Respond with Status code: 400 Error Msg: Bad Request", () => {
		return request(app)
			.get("/api/articles/seven")
			.expect(400)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toBe("Bad Request");
			});
	});
});

describe("Testing GET /api/articles/:article_id/comments", () => {
	test("200: Respond with the requested Topics array of article objects", () => {
		return request(app)
			.get("/api/articles/1/comments")
			.expect(200)
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

describe("Testing POST /api/articles/:article_id/comments", () => {
	test.only("201: Respond with the posted comments to the comment table", () => {
		const comment = {
			username: "butter_bridge",
			body: "Its a beautiful day let go fow a walk",
		};
		return request(app)
			.post("/api/articles/1/comments")
			.send(comment)
			.expect(201)
			.then((res) => {
				const { body, author, article_id, comment_id, created_at } =
					res.body.comment;

				expect(typeof body).toBe("string");
				expect(typeof author).toBe("string");
				expect(body).toBe("Its a beautiful day let go fow a walk");
				expect(author).toBe("butter_bridge");
				expect(typeof created_at).toBe("string");
				expect(typeof comment_id).toBe("number");
				expect(article_id).toBe(1);
			});
	});

	xtest("403: Respond with Status Code:403 and Error message: Forbidden to make request when Username does not Exists", () => {
		const comment = {
			username: "jhon121",
			body: "this is a good blog",
		};
		return request(app)
			.post("/api/articles/99999/comments")
			.send(comment)
			.expect(403)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toBe("Forbidden to make this request");
			});
	});

	xtest("403: Respond with Status Code:403 and Error message: Forbidden to make request, when article Id does Not Exist", () => {
		const comment = {
			username: "butter_bridge",
			body: "A quick lazy fox jumps over a lazy dog",
		};
		return request(app)
			.post("/api/articles/99/comments")
			.send(comment)
			.expect(403)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toBe("Forbidden to make this request");
			});
	});
});

describe("Test Patch /api/articles/:article_id", () => {
	test("200 OK Respond with the updated article, when vote is increased ", () => {
		const votes = { inc_votes: 50 };

		return request(app)
			.patch("/api/articles/7")
			.send(votes)
			.expect(200)
			.then((res) => {
				const {
					article_id,
					title,
					body,
					created_at,
					votes,
					article_img_url,
					topic,
					author,
				} = res.body.article;

				expect(typeof article_id).toBe("number");
				expect(typeof title).toBe("string");
				expect(typeof body).toBe("string");
				expect(typeof votes).toBe("number");
				expect(typeof created_at).toBe("string");
				expect(typeof article_img_url).toBe("string");
				expect(typeof topic).toBe("string");
				expect(typeof author).toBe("string");

				expect(article_id).toBe(7);
				expect(title).toBe("Z");
				expect(body).toBe("I was hungry.");
				expect(votes).toBe(50);
				expect(created_at).toBe("2020-01-07T14:08:00.000Z");
				expect(article_img_url).toBe(
					"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
				);
				expect(topic).toBe("mitch");
				expect(author).toBe("icellusedkars");
			});
	});
	test("404: Respond status code: 404 and error msg Not Found , when the article id does not exist ", () => {
		const votes = { inc_votes: 50 };

		return request(app)
			.patch("/api/articles/7777")
			.send(votes)
			.expect(404)
			.then(({ body }) => {
				const { msg } = body;

				expect(msg).toBe("Not Found");
			});
	});
	test("400: Respond status code: 400 and error msg Bad Request, when the article id is not a number ", () => {
		const votes = { inc_votes: 50 };

		return request(app)
			.patch("/api/articles/not-a-num")
			.send(votes)
			.expect(400)
			.then(({ body }) => {
				const { msg } = body;

				expect(msg).toBe({ msg: "Bad Request" });
			});
	});
});

describe.only("Test Delete /api/comments/:comment_id", () => {
	test("204: Delete the Comment and Respond with Status code 204, No Content", () => {
		return request(app)
			.delete("/api/comments/1")
			.expect(204)
			.then(({ body }) => {
				expect(body).toEqual({});
			});
	});
	test("404: Return with status 404 error msg comment not found", () => {
		return request(app)
			.delete("/api/comments/99923")
			.expect(404)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toEqual("Not Found");
			});
	});
	test("400: Return with status 400 and error msg comment Bad Request", () => {
		return request(app)
			.delete("/api/comments/invalid-id")
			.expect(400)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toEqual("Bad Request");
			});
	});
});
