import { db } from "../database/database.connection.js";

export async function createHashtag(name) {
    try {
        const query = `INSERT INTO "Hashtags" (name) VALUES $1 RETURNING id`;
        const result = await db.query(query, [name]);
        return result.rows[0].id;
    } catch (error) {
        console.error("Erro ao criar hashtag:", error);
        return res.sendStatus(500);
    }
}

export async function addPostHashtags(postId, hashtagId) {
    try {
        const query = `INSERT INTO "PostHashtags" (postId, hashtagId) VALUES ($1, $2)`;
        await db.query(query, [postId, hashtagId]);
    } catch (error) {
        console.error("Erro ao adicionar hashtags de um post:", error);
        return res.sendStatus(500);
    }
}
