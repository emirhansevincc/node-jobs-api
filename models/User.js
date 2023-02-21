const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name must be at least 2 characters long"],
        maxlength: [30, "Name must be less than 20 characters long"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Match's first argument is a regular expression that checks for a valid email address
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
        minlength: [5, "Email must be at least 2 characters long"],
        maxlength: [30, "Email must be less than 20 characters long"]
    },
    password: {
        type: String,
        required: true,
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

module.exports = mongoose.model('User', UserSchema);