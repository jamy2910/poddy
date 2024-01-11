import { nanoid } from "nanoid";
import db from "../db/postgres.js";

export const likeEpisode = async (req, res) => {
    const { id } = req.user;
    const { podcastId } = req.params;
    const likeId = nanoid();

    const { rows: insertLike } = await db.query('INSERT INTO likes VALUES ($1, $2, $4)', [likeId, podcastId, id]);

    res.status(200).json({ msg: 'Liked podcast' });
};

export const unlikeEpisode = async (req, res) => {
    const { id } = req.user;
    const { podcastId } = req.params;

    const { rows } = await db.query('DELETE FROM likes WHERE podcastid = $1, AND userid = $2', [podcastId, id]);

    res.status(200).json({ msg: 'Unliked podcast' });
};

export const getEpisodeLikes = async (req, res) => {

};

export const getUsersLikes = async (req, res) => {
    const { id } = req.user;

    const query = 'SELECT podcasts.* FROM podcasts JOIN likes ON podcasts.userid = likes.userid WHERE podcasts.userid = $1';

    const { rows: selectResponse } = await db.query(query, [id]);
};