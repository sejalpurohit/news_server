\c nc_news_test

SELECT * FROM articles;
SELeCT * FROM comments;


-- SELECT 
--     articles.*, 
--     COUNT(comments.comment_id) AS comment_count
-- FROM 
--     articles
-- LEFT JOIN 
--     comments 
-- ON 
--     articles.article_id = comments.article_id
-- GROUP BY 
--     articles.article_id;

    -- SELECT article_id, title, body AS article_desc, created_at, votes, article_img_url ,topic, author,  COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id;


    SELECT 
    articles.article_id,
    articles.title,
    articles.body AS article_desc,
    articles.created_at,
    articles.votes,
    articles.article_img_url,
    articles.topic,
    articles.author,
    COUNT(comments.comment_id) AS comment_count
FROM 
    articles
LEFT JOIN 
    comments 
ON 
    articles.article_id = comments.article_id
GROUP BY 
    articles.article_id;
