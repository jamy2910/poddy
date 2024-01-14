import jwt from 'jsonwebtoken'

export const authenticateUser = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ msg: 'unathenticated' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const random = jwt.decode(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };

    next();
}