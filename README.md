# 📰 News Server Backend

A RESTful backend service for the **NC News** platform — a Reddit-style news application where users can interact with articles, comments, and votes through API endpoints.

Built with **Node.js**, **Express**, and **PostgreSQL**.

---

## 🧩 Project Summary

**NC News BACKEND** supports the following core features via HTTP requests:

- 📰 **Browse** all articles or filter them by topic
- 📄 **Retrieve** a single article with its comments and vote count
- 💬 **Comment** on articles
- 👍 **Vote** on articles
- ✍️ **Create**, **update**, or **delete** articles

All the APIs follows RESTful principles and is designed to be consumed by a frontend client (e.g., a React app).

---

## 🛠️ Tech Stack

- **Backend Framework:** Node.js + Express + pßg-format
- **Routing:** Express Router
- **Database:** PostgreSQL
- **Query Formatting:** pg-format
- **Testing:** Jest + Supertest
- **Environment:** dotenv
- **Version Control:** Git & GitHub

---

## ⚙️ Requirements

- **Node.js:** v18.0.0 or higher
- **PostgreSQL:** v14.0 or higher

---

## 💻 Installation & Setup

Follow these steps to get the project running locally:

1️⃣ Clone the Repository

```bash
git clone https://github.com/sejalpurohit/news_server.git
cd nc-news
```

2️⃣ Install Dependencies

```
npm install
```

3️⃣ Create Environment Files

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

4️⃣ Set Up Databases and Seed Data

```bash
npm run setup-dbs
npm run seed
```

5️⃣ Run in Development Mode

```bash
npm run dev
```

6️⃣ Run Tests

```bash
npm test
```
