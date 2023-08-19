import { db } from "../database/database.connection.js";

export async function addPost(userId, content, link) {
    try {
        const query = `INSERT INTO "Posts" (userId, content, link) VALUES ($1, $2, $3) RETURNING id`;
        const result = await db.query(query, [userId, content, link]);
        return result.rows[0].id;
    } catch (error) {
        throw error;
    }
}

export async function editPost(userId, content, link, postId) {
    try {
        const query = `UPDATE "Posts" SET content = $1, link = $2 WHERE id = $3 AND userId = $4`;
        await db.query(query, [content, link, postId, userId]);
        if (result.rowCount === 0) {
            throw new Error(
                "Post não encontrado ou você não tem permissão para editá-lo."
            );
        }
    } catch (error) {
        throw error;
    }
}

export async function removePost(postId) {
    try {
        const query = `DELETE FROM "Posts" WHERE id = $1 AND userId = $2`;
        await db.query(query, [postId, userId]);
        if (result.rowCount === 0) {
            throw new Error(
                "Post não encontrado ou você não tem permissão para deletá-lo."
            );
        }
    } catch (error) {
        throw error;
    }
}
