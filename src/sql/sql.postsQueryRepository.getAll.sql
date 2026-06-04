SELECT p."id"                                                                                   as "postId",
       p.title,
       b."id",
       b."name",
       (SELECT COUNT(*) FROM "PostLikes" as pl WHERE pl."id" = p."id" AND pl."status" = 'Like') as "likeCount"
FROM "Posts" as p
         JOIN "Blogs" as b ON p."blogId" = b."id";


SELECT COUNT(*)
FROM "Posts"



SELECT p."id" as "postId",
       p.title,
       b."id",
       b."name",
       -- (SELECT COUNT(*) FROM "Posts") as totalCount,
       (SELECT COUNT(*) FROM "PostLikes" as pl WHERE pl."postId" = p."id" AND pl."status" = 'Like') as "likeCount",
       (SELECT COUNT(*) FROM "PostLikes" as pl WHERE pl."postId" = p."id" AND pl."status" = 'Dislike') as "dislikeCount",
       (SELECT "status" FROM "PostLikes" as pl WHERE pl."postId" = p."id" AND pl."userId" = '496d8be2-76f8-493c-b165-3f63b655cf4f')  as "myStatus"
        -- COALESCE ((SELECT "status" FROM "PostLikes" as pl WHERE pl."postId" = p."id" AND pl."userId" = '496d8be2-76f8-493c-b165-3f63b655cf4f'), 'None')  as "myStatus"
FROM "Posts" as p
         JOIN "Blogs" as b ON p."blogId" = b."id"
ORDER BY p."createdAt" DESC
    LIMIT 4 OFFSET 2;




SELECT json_agg(t) FROM (
    SELECT pl."userId", u."login", u."createdAt" FROM "PostLikes" pl  JOIN "Users" u ON pl."userId" = u."id"
) t;



SELECT p."id" as "postId",
       p.title,
       b."id",
       b."name",
       (SELECT json_agg(t)
        FROM
            (SELECT p."id", pl."userId", u."login", u."createdAt" FROM "PostLikes" pl JOIN "Users" u ON pl."userId" = u."id")
        t
       ) as newestLikes,
       (SELECT COUNT(*) FROM "Posts") as totalCount,
       (SELECT COUNT(*) FROM "PostLikes" as pl WHERE pl."postId" = p."id" AND pl."status" = 'Like') as "likeCount",
       (SELECT COUNT(*) FROM "PostLikes" as pl WHERE pl."postId" = p."id" AND pl."status" = 'Dislike') as "dislikeCount",
       (SELECT "status" FROM "PostLikes" as pl WHERE pl."postId" = p."id" AND pl."userId" = '496d8be2-76f8-493c-b165-3f63b655cf4f')  as "myStatus"
FROM "Posts" as p
         JOIN "Blogs" as b ON p."blogId" = b."id"
ORDER BY p."createdAt" DESC
    LIMIT 4 OFFSET 2;
