import { nanoid } from "nanoid";
import db from "../db/postgres.js";

export const getAllReplies = async (req, res) => {
    const { commentId } = req.params;

    const { rows: replies } = await db.query('SELECT * FROM replies WHERE commentid = $1 LIMIT 10', [commentId]);

    res.status(200).json(replies);
}

export const DeleteReply = async (req, res) => {
    const { id } = req.user;
    const { replyId } = req.params;

    const deleteResponse = await db.query('DELETE FROM replies WHERE id = $1 AND userid = $2', [replyId, id]);

    if (deleteResponse.rowCount === 0) {
        return res.status(401).json({ msg: 'Unable to delete reply' });
    }

    res.status(200).json({ msg: 'Reply deleted' });
}

export const postReply = async (req, res) => {
    const { id, username } = req.user;
    const { text } = req.body;
    const { commentId } = req.params;
    const replyId = nanoid();

    const { rows: postResponse } = await db.query('INSERT INTO replies VALUES ($1, $2, $3, $4, $5)', [replyId, id, commentId, text, username]);

    res.status(200).json({ msg: 'Reply posted' });
}