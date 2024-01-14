import db from "../db/postgres.js";

export const getCurrentProfile = async (req, res) => {
    const { id } = req.user;

    const { rows: user } = await db.query('SELECT username, email, id FROM users WHERE id = $1', [id]);

    res.status(200).json(user[0]);
}

export const getSingleProfile = async (req, res) => {
    const { profId } = req.params;

    const { rows: singleUser } = await db.query('SELECT username, email FROM users WHERE id = $1', [profId]);

    if (singleUser.length < 1) {
        return res.status(404).json({ msg: 'No user found' })
    }

    res.status(200).json(singleUser[0]);
}

export const deleteProfile = async (req, res) => {
    const { id } = req.user;

    const response = await db.query('DELETE FROM users WHERE id = $1', [id]);

    res.clearCookie('token');

    res.status(200).json({ msg: 'profile deleted' });
}

export const editProfile = async (req, res) => {
    const { id } = req.user;
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(404).json({ msg: 'Please provide all values' });
    }

    const response = await db.query('UPDATE users SET username = $1, email = $2 WHERE id = $3', [username, email, id]);

    res.status(200).json({ msg: 'Update success' });
}