const login = async (req, res, next) => {
    res.json({ message: 'login',  });
};
const register = async (req, res) => {
    res.json({ message: 'register' });
}

module.exports = {
    login,
    register
}