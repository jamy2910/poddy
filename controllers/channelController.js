import db from "../db/postgres.js";
import { uploadChannelPicToS3, getChannelPreSignedUrl, deleteChannelPic } from "../utils/s3Utils.js";
import { nanoid } from "nanoid";

export const getChannels = async (req, res) => {
    const { sort, category, title } = req.body;

    const query = 'SELECT * FROM channels WHERE 1=1';
    const paramIndex = 1;

    if (category) {
        query += ` AND category = $${paramIndex}`;
        paramIndex++;
    }

    if (title) {
        query += ` AND title ILIKE $${paramIndex}`;
        paramIndex++
    }

    const { rows: response } = await db.query(query + ' LIMIT 10');

    if(response.length < 1) {
        return res.status(404).json({msg: 'No channels found'});
    }

    for (const channel of response) {
        await getChannelPreSignedUrl(channel);
    }

    res.status(200).json(response);
};

export const getSingleChannel = async (req, res) => {
    const { channelID } = req.params;

    const { rows: response } = await db.query('SELECT * FROM channels WHERE id = $1', [channelID]);

    if (response.length < 1) {
        return res.status(404).json({ msg: 'No channel found' })
    }

    await getChannelPreSignedUrl(response[0]);

    res.status(200).json(response[0]);
};

export const createChannel = async (req, res) => {
    const { id } = req.user;
    const { title, subheading, description } = req.body;
    const channelPic = req.file;

    if (!channelPic) {
        return res.status(404).json({ msg: 'Please upload an image' });
    }

    if (!title || !description || !channelPic) {
        return res.status(404).json({ msg: 'Please provide all values' });
    }

    // Randomise pic id
    channelPic.id = nanoid();

    // Send pic to S3
    const AWSResponse = await uploadChannelPicToS3(channelPic);

    // Insert values into database
    const { rows: insertResponse } = await db.query('INSERT INTO channels VALUES ($1, $2, $3, $4, $5, $6)', [channelPic.id, title, subheading, description, id, channelPic.id]);

    res.status(200).json({ msg: 'Created channel successfully' });

};

export const deleteChannel = async (req, res) => {
    const { id } = req.user;
    const { channelID } = req.params;

    // Check if user owns the channel
    const response = await db.query('DELETE FROM channels WHERE id = $1 AND userId = $2', [channelID, id]);
    if(response.rowCount < 1) {
        return res.status(401).json({msg: 'Unable to delete'});
    }

    const deleteResponse = await deleteChannelPic(channelID);

    res.status(200).json({ msg: 'Channel deleted successfully' });
};

export const editChannel = async (req, res) => {
    const { id } = req.user;
    const { channelId } = req.params;
    const channelPic = req.file;
    const { title, subheading, description } = req.body;

    if (!title, !description) {
        return res.status(404).json({ msg: 'Please provide all values' });
    }

    // Check to see if user owns the channel
    const editResponse = await db.query('UPDATE channels SET title = $1, subheading = $2, description = $3 WHERE userid = $4 AND id = $5', [title, subheading, description, id, channelId]);
    if (editResponse.rowCount < 1) {
        return res.status(401).json({msg: 'unautheticated'})
    }

    if (channelPic) {
        channelPic.id = channelId;
        const response = await uploadChannelPicToS3(channelPic);
    }

    res.status(200).json({ msg: 'Edit successful' });
};