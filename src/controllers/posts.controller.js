import {
    createHashtag,
    addPostHashtags,
} from "../repositories/hashtags.repository.js";
import {
    addPost,
    editPost,
    removePost,
} from "../repositories/posts.repository.js";

export async function publish(req, res) {
    const { userId } = res.locals;
    const { content, link } = req.body;
    try {
        const postId = await addPost(userId, content, link);
        const hashtags = content.match(/#\w+/g);
        if (hashtags) {
            hashtags.forEach(async (hashtag) => {
                const normalized = hashtag.toLowerCase();
                const exists = await db.query(
                    `SELECT id FROM Hashtags WHERE name = $1`,
                    [normalized]
                );
                let hashtagId;
                if (exists.rows.length === 0) {
                    hashtagId = await createHashtag(normalized);
                } else {
                    hashtagId = exists.rows[0].id;
                }
                await addPostHashtags(postId, hashtagId);
            });
        }
        return res.sendStatus(201);
    } catch (error) {
        console.error("Erro ao publicar post:", error);
        res.sendStatus(500);
    }
}

export async function edit(req, res) {
    const { userId } = res.locals;
    const { postId } = req.params;
    const { content, link } = req.body;

    try {
        await editPost(userId, content, link, postId);
        res.sendStatus(200);
    } catch (error) {
        console.error("Erro ao editar post:", error);
        res.sendStatus(500);
    }
}

export async function remove(req, res) {
    const { userId } = res.locals;
    const { postId } = req.params;

    try {
        await removePost(userId, postId);
        res.sendStatus(200);
    } catch (error) {
        console.error("Erro ao editar post:", error);
        res.sendStatus(500);
    }
}
