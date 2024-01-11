import { nanoid } from "nanoid";
import db from "../db/postgres.js";

export const likeEpisode = async (req, res) => {
    const { id } = req.user;
    const { podcastId } = req.params;
    const likeId = nanoid();

    if (!podcastId) {
        return res.status(401).json({ msg: 'unable to post comment' })
    }

    // Check to see if it already liked
    const { rows: likeCheck } = await db.query('SELECT id FROM likes WHERE podcastid = $1 AND userid = $2', [podcastId, id]);
    if (likeCheck.length > 0) {
        return res.status(401).json({ msg: 'You have already liked this post' });
    }

    // Check to see if podcast exists
    const { rows: podcastCheck } = await db.query('SELECT id FROM podcasts WHERE id = $1', [podcastId]);
    if (podcastCheck.length < 1) {
        return res.status(404).json({ msg: 'Podcast not found' })
    }

    const { rows: insertLike } = await db.query('INSERT INTO likes VALUES ($1, $2, $3)', [likeId, id, podcastId]);

    res.status(200).json({ msg: 'Liked podcast' });
};

export const unlikeEpisode = async (req, res) => {
    const { id } = req.user;
    const { podcastId } = req.params;

    if (!podcastId) {
        return res.status(404).json({ msg: 'Unable to unlike post' });
    }

    const { rows } = await db.query('DELETE FROM likes WHERE podcastid = $1 AND userid = $2', [podcastId, id]);

    res.status(200).json({ msg: 'Unliked podcast' });
};

export const getEpisodeLikes = async (req, res) => {

};

export const getUsersLikes = async (req, res) => {
    const { id } = req.user;

    const { rows: likedPodcasts } = await db.query('SELECT * FROM likes WHERE userid = $1', [id]);

    let query = 'SELECT * FROM podcasts WHERE id IN (';
    const params = [];
    let paramIndex = 1;
    let podcastList = [];

    for (const like of likedPodcasts) {
        podcastList.push(like.podcastid);
        params.push(`$${paramIndex}`);
        paramIndex++
    };

    if (podcastList.length < 1) {
        return res.status(404).json({ msg: 'No liked posts' })
    }

    const { rows: podcasts } = await db.query(query + params.join(',') + ')', podcastList);

    res.status(200).json(podcasts);
};