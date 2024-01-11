import { nanoid } from "nanoid";
import db from "../db/postgres.js";

export const uploadComment = async (req, res) => {
    const { id, username } = req.user;
    const { body } = req.body;
    const { podcastId } = req.params;
    const commentId = nanoid();

    const { rows: channelSelect } = await db.query('SELECT title FROM podcasts WHERE id = $1', [podcastId]);
    if (channelSelect.length < 1) {
        return res.status(401).json({ msg: 'Unable to post comment' });
    }
    const { title: channelName } = channelSelect[0];

    const { rows: commentInput } = await db.query('INSERT INTO comments VALUES ($1, $2, $3, $4, $5, $6)', [commentId, body, username, channelName, podcastId, id]);

    res.status(200).json({ msg: 'Upload comment success' });
};

export const getComments = async (req, res) => {
    const { podcastId } = req.params;

    const { rows: commentList } = await db.query('SELECT body, username FROM comments WHERE podcastid = $1', [podcastId]);
    if (commentList.length < 1) {
        return res.status(404).json({ msg: 'No comments found' });
    }

    res.status(200).json(commentList);
};


export const deleteComment = async (req, res) => {
    const { id } = req.user;
    const { commentId } = req.params;

    // Check if user owns the comment
    const { rows: userCheck } = await db.query('SELECT id FROM comments WHERE id = $1 AND userid = $2', [commentId, id]);
    if (userCheck.length < 1) {
        return res.status(401).json({ msg: 'unauthenticated' });
    }

    const { rows: deleteResponse } = await db.query('DELETE FROM comments WHERE id = $1 AND userid = $2', [commentId, id]);

    res.status(200).json({ msg: 'Comment deleted' });
};

export const getUserComments = async (req, res) => {
    const { id } = req.user;

    const { rows: commentList } = await db.query('SELECT * FROM comments WHERE userid = $1', [id]);
    if (commentList.length < 1) {
        return res.status(404).json({ msg: 'No comments found' });
    }

    res.status(200).json(commentList);
};