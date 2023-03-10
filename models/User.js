const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name must be at least 2 characters long"],
        maxlength: [30, "Name must be less than 20 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        // Match's first argument is a regular expression that checks for a valid email address
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
        minlength: [5, "Email must be at least 2 characters long"],
        maxlength: [30, "Email must be less than 20 characters long"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [5, "Password must be at least 8 characters long"],
    },
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        }
    );
});

UserSchema.methods.createJsonWebToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}


module.exports = mongoose.model('User', UserSchema);