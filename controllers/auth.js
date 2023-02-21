const User = require('../models/User');

const login = async (req, res, next) => {
    res.status(200).json({ msg: "Login successful" })
};

const register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ user: {
            name: user.name,
        } });
        
    } catch (error) {
        res.status(400).json( error.message );
    }
};

module.exports = {
    login,
    register
}