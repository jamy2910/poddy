import jwt from 'jsonwebtoken'

export const authenticateUser = (req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({msg: 'unathenticated'});
    }

    const {id, username} = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {id, username};

    next();
}