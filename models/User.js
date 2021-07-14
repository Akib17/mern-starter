const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: String,
    password: String,
    avatar: String,
    date: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: false
    },
    activationToken: String,
    passwordResetToken: String
});

const User = mongoose.model('user', UserSchema);

module.exports = User;