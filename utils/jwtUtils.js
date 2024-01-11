import jwt from 'jsonwebtoken';


export const generateJWT = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return token;
}