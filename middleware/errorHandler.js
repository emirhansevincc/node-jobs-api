const errorHandler = (err, req, res, next) => {
    return res.status(err.statusCode || 400).send(err.message || "Something went wrong");
};

module.exports = errorHandler;