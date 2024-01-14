import db from "../db/postgres.js";

export const getAccountSettings = async (req, res) => {
    const { id } = req.user;

    const { rows: response } = await db.query('SELECT * FROM account_settings WHERE userid = $1', [id]);

    res.status(200).json(response[0]);
}

export const updateAccountSettings = async (req, res) => {
    const { id } = req.user;
    const { explicit, datausage, emails, keepprivate } = req.body;

    if (explicit === undefined, datausage === undefined, emails === undefined, keepprivate === undefined) {
        return res.status(404).json({ msg: 'Please provide all values' });
    }

    const query = 'UPDATE account_settings SET explicit = $1, keepprivate = $2, datausage = $3, emails = $4 WHERE userid = $5';

    const { rows: response } = await db.query(query, [explicit, keepprivate, datausage, emails, id]);
    console.log(response);

    res.status(200).json({ msg: 'Settings updated' });
}