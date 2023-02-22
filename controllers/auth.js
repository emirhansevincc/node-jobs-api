const User = require('../models/User');
const { tryCatch } = require('../utils/tryCatch');

const login = async (req, res, next) => {
    res.status(200).json({ msg: "Login successful" })
};

const register = tryCatch( async (req, res, next) => {
    const user = await User.create(req.body);
    const JWTToken = user.createJsonWebToken();
    res.status(201).json({
        user: {
            id: user._id,
            name: user.name,
        },
        token: JWTToken
    });
});

module.exports = {
    login,
    register
}