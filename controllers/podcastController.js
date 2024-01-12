import { nanoid } from "nanoid";
import db from "../db/postgres.js";
import { getPodcastPreSignedUrl, uploadPodcastThumbanail } from "../utils/s3Utils.js";

export const getAllPodcasts = async (req, res) => {
    let { search, date, category, sort, page } = req.query;

    let query = 'SELECT podcasts.*, COALESCE(COUNT(likes.id), 0) AS likes FROM podcasts LEFT JOIN likes ON podcasts.id = likes.podcastid WHERE 1=1';
    const paramIndex = 1; // Keeps track of how many parameters have been added

    if (search) {
        query += ` AND title = $${paramIndex}`;
        paramIndex++;
    }

    if (category) {
        query += ` AND category = $${paramIndex}`;
        paramIndex++;
    }

    if (date) {

    }

    query += ' GROUP BY podcasts.id'; // Needs to be done before sorting

    // Sorting logic
    switch (sort) {
        case 'trending':
            query += ' ORDER BY likes'
            break;

        case 'mostpopular':
            query += ' ORDER BY views'
            break;

        case 'dateposted':
            query += ' ORDER BY dateposted'
            break;
    }

    // Default page if omitted
    if (!page) {
        page = 1;
    }

    const offset = (page - 1) * 15; // Pagination logic
    query += ` LIMIT 15 OFFSET ${offset}`

    const { rows: response } = await db.query(query);

    for (const podcast of response) {
        await getPodcastPreSignedUrl(podcast);
    }

    res.status(200).json(response);
}

export const getSinglePodcast = async (req, res) => {
    const { podcastId } = req.params;

    const { rows: response } = await db.query('SELECT * FROM podcasts WHERE id = $1', [podcastId]);

    const { rows } = await db.query('SELECT COUNT(id) AS likes FROM likes WHERE podcastid = $1', [podcastId]);
    const { likes } = rows[0];

    response[0].likes = Number(likes);

    if (response.length < 1) {
        return res.status(404).json({ msg: 'No podcast found' });
    }

    await getPodcastPreSignedUrl(response[0]);

    res.status(200).json(response[0]);
}

export const createPodcast = async (req, res) => {

    // *---- MAKE A SEPARATE ROUTE FOR REQUESTING THE URL FOR UPLOADING THE AUDIO ON CLIENT SIDE AND THEN DO THIS REQUEST AFTER ---*

    const { title, description } = req.body;
    const { channelId } = req.params;
    const thumbnail = req.file;
    const podcastId = nanoid(); // Create a unique id for the podcast

    if (!thumbnail) {
        return res.status(404).json({ msg: 'Upload an image' })
    }

    thumbnail.id = podcastId; // Give the image an id for uploading to s3
    const { id } = req.user;

    // Check to make sure the user owns the channel before upload
    const { rows: channelCheck } = await db.query('SELECT * FROM channels WHERE id = $1 AND userid = $2', [channelId, id]);
    if (channelCheck.length < 1) {
        return res.status(401).json({ msg: 'unauthenticated' });
    }

    // Validate the user input
    if (!title || !description || !thumbnail) {
        return res.status(404).json({ msg: 'Please provide all values' });
    }

    // Upload thumbnail to s3
    await uploadPodcastThumbanail(thumbnail);

    // Insert data into database
    const { rows: response } = await db.query('INSERT INTO podcasts VALUES ($1, $2, $3, $4, $5, $6)', [podcastId, title, description, id, channelId, channelCheck[0].title]);

    // Response
    res.status(200).json({ msg: 'Upload success' });
}

export const deletePodcast = async (req, res) => {
    const { id } = req.user;
    const { podcastId } = req.params;

    // Check to make sure the user owns the podcast
    const { rows: userCheck } = await db.query('SELECT * FROM podcasts WHERE id = $1 AND userid = $2', [podcastId, id]);
    if (userCheck.length < 1) {
        return res.status(401).json({ msg: 'unauthenticated' });
    }

    const { rows: deleteResponse } = await db.query('DELETE FROM podcasts WHERE id = $1 AND userid = $2', [podcastId, id]);

    res.status(200).json({ msg: 'Delete success' });
}

export const editPodcast = async (req, res) => {
    const { podcastId } = req.params;
    const { title, description } = req.body;
    const thumbnail = req.file;
    const { id } = req.user;

    if (!title || !description) {
        return res.status(404).json({ msg: 'Please provide all values' });
    }

    const { rows: userCheck } = await db.query('SELECT * FROM podcasts WHERE id = $1 AND userid = $2', [podcastId, id]);

    if (userCheck.length < 1) {
        return res.status(401).json({ msg: 'unauthenticated' });
    }

    if (thumbnail) {
        thumbnail.id = podcastId;
        await uploadPodcastThumbanail(thumbnail);
    }

    const { rows: response } = await db.query('UPDATE podcasts SET title = $1, description = $2 WHERE id = $3 AND userid = $4', [title, description, podcastId, id]);

    res.status(200).json({ msg: 'Edited successfully' });
}