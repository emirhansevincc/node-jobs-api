const User = require('../models/User');
const { tryCatch } = require('../utils/tryCatch');
const bcrypt = require('bcryptjs');

const login = tryCatch( async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error('Please provide email and password');
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error('Invalid credentials');
    }

    const JWTToken = user.createJsonWebToken();

    res.status(200).json({
        user: {
            id: user._id,
            name: user.name,
        },
        token: JWTToken
    });

});

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