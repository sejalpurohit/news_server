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
describe("Test All */ ", () => {
	test("404: Respond with 404 for invalid Route", () => {
		return request(app)
			.get("/api/newtopic")
			.expect(404)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toBe("Not Found");
			});
	});
});

describe("Testing GET /api/topics", () => {
	test("200: Respond with  status code 200 and the all the Topics as array of topic objects", () => {
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
});

describe("Testing GET /api/users", () => {
	test("200: Respond with status code 200 and all the Users as Array of User objects", () => {
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

describe("Testing GET /api/articles", () => {
	test("200: Respond with status code 200 and the all the articles as array of article objects GET /api/articles", () => {
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
	test("200: Respond with status code 200 and all the articles in specified order as per the QueryParams GET /api/articles?sort_by=votes&order=ASC", () => {
		return request(app)
			.get("/api/articles?sort_by=votes&order=ASC")
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
	test("200: Respond with 200 and all the Articles in default order when order & sort_by are not valid: GET /api/articles?sort_by=invalid&order=none ", () => {
		return request(app)
			.get("/api/articles?sort_by=invalid&order=none")
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
	test("200: Respond with 200 when filtered the articles by the topic specified in the queryParam GET /api/articles?topic=cats ", () => {
		return request(app)
			.get("/api/articles?topic=cats")
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
	test("200: Responds with 200 and che check the sorted order of articles.", () => {
		return request(app)
			.get("/api/articles?sort_by=article_id&order=desc")
			.expect(200)
			.then(({ text }) => {
				const parsedData = JSON.parse(text);

				const articlesData = parsedData.articles;

				expect(Array.isArray(articlesData)).toBe(true);
				expect(articlesData).toBeSortedBy("article_id", { descending: true });
				articlesData.forEach((article) => {
					expect(typeof article.author).toBe("string");
					expect(typeof article.title).toBe("string");
					expect(typeof article.article_id).toBe("number");
					expect(typeof article.topic).toBe("string");
					expect(typeof article.created_at).toBe("string");
					expect(typeof article.votes).toBe("number");
					expect(typeof article.article_img_url).toBe("string");
					expect(typeof article.comment_count).toBe("string");
				});
			});
	});
	test("404: Respond with 404 when filtered the articles by the topic, and the topic value is invalid in the query GET /api/articles?topic=invalid", () => {
		return request(app)
			.get("/api/articles?topic=invalid")
			.expect(404)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toBe("Not Found");
			});
	});
});

describe("Testing GET /api/articles/:article_id", () => {
	test("200: Respond status code 200 and requested Article object, with comment count", () => {
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
					comment_count,
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
				expect(typeof comment_count).toBe("number");
			});
	});
	test("200: Respond status code 200 and requested Article object, with comment count =0 when no comments added for the article Id", () => {
		return request(app)
			.get("/api/articles/2")
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
					comment_count,
				} = _body.article;

				expect(article_id).toBe(2);
				expect(typeof author).toBe("string");
				expect(typeof title).toBe("string");
				expect(typeof article_id).toBe("number");
				expect(typeof body).toBe("string");
				expect(typeof topic).toBe("string");
				expect(typeof created_at).toBe("string");
				expect(typeof votes).toBe("number");
				expect(typeof article_img_url).toBe("string");
				expect(typeof comment_count).toBe("number");
				expect(comment_count).toBe(0);
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
	test("200: Respond with status code 200 and all the comments for the artcile Id as array of comment objects", () => {
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
	test("400: Respond with status code 400 for invalid article id", () => {
		return request(app)
			.get("/api/articles/invalid/comments")
			.expect(400)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toBe("Bad Request");
			});
	});
	test("404: Respond with status code 404 when No comments found for valid comment Id", () => {
		return request(app)
			.get("/api/articles/2/comments")
			.expect(404)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toBe("Not Found");
			});
	});
	test("404: Respond with status code 404 when No article exists for the given article Id", () => {
		return request(app)
			.get("/api/articles/987654/comments")
			.expect(404)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toBe("Not Found");
			});
	});
});

describe("Testing POST /api/articles/:article_id/comments", () => {
	test("201: Respond with the posted comments to the comment table", () => {
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

	test("404: Respond with Status Code:404 and Error message: Not Found when Username does not Exists", () => {
		const comment = {
			username: "jhon121",
			body: "this is a good blog",
		};
		return request(app)
			.post("/api/articles/1/comments")
			.send(comment)
			.expect(404)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toBe("Not Found");
			});
	});

	test("404: Respond with Status Code:404, when article Id does Not Found", () => {
		const comment = {
			username: "butter_bridge",
			body: "A quick lazy fox jumps over a lazy dog",
		};
		return request(app)
			.post("/api/articles/999/comments")
			.send(comment)
			.expect(404)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toBe("Not Found");
			});
	});
	test("400: Respond with Status Code:400, when article Id is not valid", () => {
		const comment = {
			username: "butter_bridge",
			body: "A quick lazy fox jumps over a lazy dog",
		};
		return request(app)
			.post("/api/articles/invalid/comments")
			.send(comment)
			.expect(400)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toBe("Bad Request");
			});
	});
	test("400: Respond with Status Code:400, when no username in req body ", () => {
		const comment = {
			username: "",
			body: "A quick lazy fox jumps over a lazy dog",
		};
		return request(app)
			.post("/api/articles/invalid/comments")
			.send(comment)
			.expect(400)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toBe("Bad Request");
			});
	});
	test("400: Respond with Status Code:400, when no body in req body ", () => {
		const comment = {
			username: "butter_bridge",
			body: "",
		};
		return request(app)
			.post("/api/articles/invalid/comments")
			.send(comment)
			.expect(400)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toBe("Bad Request");
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

				expect(msg).toBe("Bad Request");
			});
	});
});

describe("Test Delete /api/comments/:comment_id", () => {
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
	test("400: Return with status code 400 and error msg comment Bad Request", () => {
		return request(app)
			.delete("/api/comments/invalid-id")
			.expect(400)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toEqual("Bad Request");
			});
	});
});

describe("Test GET /api/users/:username", () => {
	test("200: Return with user object with the given username", () => {
		return request(app)
			.get("/api/users/lurker")
			.expect(200)
			.then(({ text }) => {
				const parsedData = JSON.parse(text);
				const { username, avatar_url, name } = parsedData.user;

				expect(username).toBe("lurker");
				expect(name).toBe("do_nothing");
				expect(avatar_url).toBe(
					"https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png"
				);
				expect(typeof username).toBe("string");
				expect(typeof avatar_url).toBe("string");
				expect(typeof name).toBe("string");
			});
	});
	test("404: Return with status code 404 when user doesnot exist", () => {
		return request(app)
			.get("/api/users/notExist")
			.expect(404)
			.then(({ body }) => {
				const { msg } = body;

				expect(msg).toBe("User not Found");
			});
	});
});

describe("Test PATCH /api/comments/:comment_id", () => {
	test("200 Respond with the updated comment when no of votes is changed", () => {
		const reqBody = { inc_votes: 1 };

		return request(app)
			.patch("/api/comments/5")
			.send(reqBody)
			.expect(200)
			.then(({ text }) => {
				const parsedData = JSON.parse(text);
				const comment = parsedData.comment;

				const { comment_id, body, votes, created_at, article_id, author } =
					comment;

				expect(typeof comment_id).toBe("number");
				expect(typeof body).toBe("string");
				expect(typeof votes).toBe("number");
				expect(typeof created_at).toBe("string");
				expect(typeof article_id).toBe("number");
				expect(typeof author).toBe("string");
				expect(comment_id).toBe(5);
				expect(body).toBe("I hate streaming noses");
				expect(votes).toBe(1);
				expect(created_at).toBe("2020-11-03T21:00:00.000Z");
				expect(article_id).toBe(1);
				expect(author).toBe("icellusedkars");
			});
	});
	test("404: Respond status code: 404 and error msg Not Found , when the comment id does not exist ", () => {
		const votes = { inc_votes: 50 };

		return request(app)
			.patch("/api/comments/7777")
			.send(votes)
			.expect(404)
			.then(({ body }) => {
				const { msg } = body;

				expect(msg).toBe("Comment not found");
			});
	});
	test("400: Respond status code: 400 and error msg Bad Request, when the article id is not a number ", () => {
		const votes = { inc_votes: 50 };

		return request(app)
			.patch("/api/comments/not-a-num")
			.send(votes)
			.expect(400)
			.then(({ body }) => {
				const { msg } = body;

				expect(msg).toBe("Bad Request");
			});
	});
});

describe("Test POST /api/articles/", () => {
	test("201: Respond with the posted article", () => {
		const article = {
			title: "black cat",
			body: "black cat is cute",
			article_img_url: "https://dummyimage",
			topic: "mitch",
			author: "butter_bridge",
		};

		return request(app)
			.post("/api/articles/")
			.send(article)
			.expect(201)
			.then(({ text }) => {
				const parsedData = JSON.parse(text);

				const {
					article_id,
					author,
					title,
					body,
					article_img_url,
					topic,
					created_at,
					votes,
					comment_count,
				} = parsedData;
				expect(typeof article_id).toBe("number");
				expect(typeof title).toBe("string");
				expect(typeof body).toBe("string");
				expect(typeof created_at).toBe("string");
				expect(typeof votes).toBe("number");
				expect(typeof article_img_url).toBe("string");
				expect(typeof topic).toBe("string");
				expect(typeof author).toBe("string");
				expect(typeof comment_count).toBe("number");

				expect(title).toBe("black cat");
				expect(body).toBe("black cat is cute");
				expect(article_img_url).toBe("https://dummyimage");
				expect(topic).toBe("mitch");
				expect(author).toBe("butter_bridge");
			});
	});

	test("404: Respond with Status Code:404 and Error message: Not Found when Username/Author does not Exists", () => {
		const article = {
			title: "Eight pug gifs that remind me of mitch",
			body: "some gifsmmmmmmmm",
			article_img_url:
				"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
			topic: "mitchmmmmm",
			author: "randomUser",
		};

		return request(app)
			.post("/api/articles/")
			.send(article)
			.expect(404)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toBe("User not Found");
			});
	});

	test("404: Respond with Status Code:404, when article Id does Not Found", () => {
		const article = {
			title: "Eight pug gifs that remind me of mitch and cam",
			body: "wheels on the bus go round and round",
			article_img_url:
				"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
			topic: "its a new topic",
			author: "butter_bridge",
		};

		return request(app)
			.post("/api/articles/")
			.send(article)
			.expect(404)
			.then(({ body }) => {
				const { msg } = body;
				expect(msg).toBe("Topic not Found");
			});
	});

	test("404: Respond with Status Code:404, when title already exists", () => {
		const article = {
			title: "Eight pug gifs that remind me of mitch",
			body: "wheels on the bus go round and round",
			article_img_url:
				"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
			topic: "mitch",
			author: "butter_bridge",
		};

		return request(app)
			.post("/api/articles/")
			.send(article)
			.expect(404)
			.then(({ body }) => {
				const { msg } = body;

				expect(msg).toBe("Title already Exist");
			});
	});
	test("400: Respond with Status Code:404, Msg Bad Request, Request body do not have Author", () => {
		const article = {
			title: "Eight pug gifs that remind me of mitch",
			body: "wheels on the bus go round and round",
			article_img_url:
				"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
			topic: "mitch",
			author: "",
		};

		return request(app)
			.post("/api/articles/")
			.send(article)
			.expect(400)
			.then(({ body }) => {
				const { msg } = body;

				expect(msg).toBe("Bad Request");
			});
	});

	test("400: Respond with Status Code:404, Msg Bad Request, Request body do not have Topic", () => {
		const article = {
			title: "Eight pug gifs that remind me of mitch",
			body: "wheels on the bus go round and round",
			article_img_url:
				"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
			topic: "",
			author: "butter_bridge",
		};

		return request(app)
			.post("/api/articles/")
			.send(article)
			.expect(400)
			.then(({ body }) => {
				const { msg } = body;

				expect(msg).toBe("Bad Request");
			});
	});
	test("400: Respond with Status Code:404, Msg Bad Request, Request body do not have Title", () => {
		const article = {
			title: "",
			body: "wheels on the bus go round and round",
			article_img_url:
				"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
			topic: "its a new topic",
			author: "butter_bridge",
		};

		return request(app)
			.post("/api/articles/")
			.send(article)
			.expect(400)
			.then(({ body }) => {
				const { msg } = body;

				expect(msg).toBe("Bad Request");
			});
	});
});
