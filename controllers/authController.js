import { nanoid } from 'nanoid';
import db from '../db/postgres.js';
import { generateJWT } from '../utils/jwtUtils.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    // Validate request
    if (!username || !password) {
        return res.status(404).json({ msg: 'Please provide all values' });
    }

    // Check is user exists
    const { rows: userCheck } = await db.query('SELECT id, password FROM users WHERE username = $1', [username]);
    if (userCheck.length < 1) {
        return res.status(401).json({ msg: "That username doesn't exist" });
    }

    const { password: hashedPassword } = userCheck[0];

    // Check password match
    const isMatch = await comparePassword(password, hashedPassword);
    if (!isMatch) {
        return res.status(401).json({ msg: 'Password is incorrect' });
    }

    // Send JWT cookie
    const { id } = userCheck[0];
    const token = generateJWT({ id, username });
    res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true });

    // Send response
    res.status(200).json({ msg: 'Login success' });
};

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const userId = nanoid();

    // Check if username exists
    const { rows: usernameCheck } = await db.query('SELECT id FROM users WHERE username = $1', [username]);
    if (usernameCheck.length >= 1) {
        return res.status(401).json({ msg: 'Username already in use' });
    }

    // Validate request
    if (!username || !email || !password) {
        return res.status(404).json({ msg: 'Please provide all values' });
    }

    const newPassword = await hashPassword(password);

    // Insert into database
    const { rows: insertQuery } = await db.query("INSERT INTO users VALUES ($1, $2, $3, $4)", [userId, username, email, newPassword]);
    const { rows: settingsResponse } = await db.query('INSERT INTO account_settings VALUES ($1, $2, $3, $4, $5, $6)', [nanoid(), true, false, true, true, userId]);

    // Send a cookie with JWT
    const token = generateJWT({ id: userId, username });
    res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true });

    // Send Response
    res.status(200).json({ msg: 'Registration success', token });
};

export const logoutUser = async (req, res) => {
    const { token } = req.cookies;
    res.clearCookie('token');
    res.status(200).json({ msg: 'Logged out' });
};