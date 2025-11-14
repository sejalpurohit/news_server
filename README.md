# News Server Backend

A RESTful backend service for the **NC News** platform — a Reddit-style news application where users can interact with articles, comments, and votes through API endpoints.

Built with **Node.js**, **Express**, and **PostgreSQL**.

---

## Hosted Version

You can access the live API here:  
 **https://news-server-u1gw.onrender.com/**

Example endpoint:  
**https://news-server-u1gw.onrender.com/api/**

---

## GitHub Repository

https://github.com/sirat-russo/nc_news_BE.git

---

## Project Summary

**NC News BACKEND** supports the following core features via HTTP requests:

- **Browse** all articles
- **Browse** articles by article Id
- **Browse** articles by topic
- **Retrieve** article with its comments and vote count
- **Comment** on articles
- **Vote** on articles
- **Create**, **Update**, or **Delete** articles

All the APIs follows RESTful principles and is designed to be consumed by a frontend client (e.g., a React app).

---

## Tech Stack

- **Backend Framework:** Node.js + Express + pg-format
- **Routing:** Express Router
- **Database:** PostgreSQL
- **Query Formatting:** pg-format
- **Testing:** Jest + Supertest
- **Environment:** dotenv
- **Version Control:** Git & GitHub

---

## Requirements

- **Node.js:** v18.0.0 or higher
- **PostgreSQL:** v14.0 or higher

---

## Installation & Setup

Follow these steps to get the project running locally:

1. Clone the Repository

```bash
git clone https://github.com/sejalpurohit/news_server.git
cd nc-news
```

2. Install Dependencies

```
npm install
```

3. Create Environment Files

Create two `.env` files: one for development, one for testing.

- **.env.development**

```.env.development
PGDATABASE=nc_news
```

- **.env.development**

```.env.test
PGDATABASE=nc_news_test
```

⚠️ Make sure there are no semicolons at the end of the variable values.

4. Set Up Databases and Seed Data

```bash
npm run setup-dbs
npm run seed
```

5. Run in Development Mode

```bash
npm run dev
```

6. Run Tests

```bash
npm test
```
