const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authentificate = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        throw new Error('You are not authorized to access this route');
    }

    const token = authorizationHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error('User not found');
        }
        req.user = user;
        console.log(req.user);
        next();
    } catch (error) {
        throw new Error('You are not authorized to access this route');
    }
}

module.exports = authentificate;