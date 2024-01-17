import { nanoid } from "nanoid";
import db from "../db/postgres.js";
import { getPodcastPreSignedUrl, getUploadUrlPodcast, uploadPodcastThumbnail, uploadPodcast } from "../utils/s3Utils.js";
import { getAllPodcastQuery, getSinglePodcastQuery } from "../utils/queryUtils.js";
import jwt from 'jsonwebtoken'

export const getAllPodcasts = async (req, res) => {
    let { search, date, category, sort, page } = req.query;

    const response = await getAllPodcastQuery(search, category, date, sort, page);

    for (const podcast of response) {
        await getPodcastPreSignedUrl(podcast);
    }

    res.status(200).json(response);
}

export const getSinglePodcast = async (req, res) => {
    const { podcastId } = req.params;

    //  Check if a user is logged in
    let userId;
    if (req.cookies.token) {
        const { token } = req.cookies;
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        userId = id;
    }

    const podcast = await getSinglePodcastQuery(podcastId, userId);

    if (!podcast) {
        return res.status(404).json({ msg: 'No podcast found' });
    }

    await getPodcastPreSignedUrl(podcast);
    res.status(200).json(podcast);
}

export const requestUploadUrl = async (req, res) => {
    const podcastId = nanoid();
    const uploadUrl = await getUploadUrlPodcast(podcastId);
    res.status(200).json({ upload: uploadUrl, podcastId });
}

export const createPodcast = async (req, res) => {

    // *---- MAKE A SEPARATE ROUTE FOR REQUESTING THE URL FOR UPLOADING THE AUDIO ON CLIENT SIDE AND THEN DO THIS REQUEST AFTER ---*
    const { id } = req.user;
    const { title, description, category } = req.body;
    const { channelId } = req.params;
    let { file, thumbnail } = req.files;
    file = file[0];
    thumbnail = thumbnail[0];
    const podcastId = nanoid();

    thumbnail.id = podcastId; // Give the image an id for uploading to s3
    file.id = podcastId; // Give the podcast the same id

    // Get the channel title
    let { rows: getChannelTitle } = await db.query('SELECT title FROM channels WHERE id = $1 AND userid = $2', [channelId, id]);
    const { title: channelTitle } = getChannelTitle[0];



    // Upload thumbnail to s3
    await uploadPodcastThumbnail(thumbnail);
    await uploadPodcast(file);

    // Insert data into database
    const { rows: response } = await db.query('INSERT INTO podcasts VALUES ($1, $2, $3, $4, $5, $6, $7)', [podcastId, title, description, id, channelId, channelTitle, category]);

    // Response
    res.status(200).json({ msg: 'Upload success' });
}

export const deletePodcast = async (req, res) => {

    // !--- REMOVE FILES FROM S3 BUCKET ON DELETE ---!

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

export const podcastFromChannel = async (req, res) => {
    const { channelId } = req.params;
    const query = 'SELECT podcasts.*, COALESCE(COUNT(likes.id), 0) AS likes FROM podcasts LEFT JOIN likes ON podcasts.id = likes.podcastid WHERE channelid = $1 GROUP BY podcasts.id LIMIT 15';

    const { rows: response } = await db.query(query, [channelId]);

    for (const podcast of response) {
        await getPodcastPreSignedUrl(podcast);
    }

    res.status(200).json(response);
}