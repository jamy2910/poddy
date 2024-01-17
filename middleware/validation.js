import db from "../db/postgres.js";

export const validatePodcastUpload = async (req, res, next) => {
    const { title, description, category } = req.body;
    const { id } = req.user;
    const { channelId } = req.params;
    const { file, thumbnail } = req.files;

    // Make sure all values are provided
    if (!title || !description || !category || !file || !thumbnail) {
        return res.status(404).json({ msg: 'Please fill in all fields' });
    }

    // Check to make sure the user owns the channel before upload
    const channelCheck = await db.query('SELECT * FROM channels WHERE id = $1 AND userid = $2', [channelId, id]);
    if (channelCheck.rowCount < 1) {
        return res.status(401).json({ msg: 'unauthenticated' });
    }

    next();
}