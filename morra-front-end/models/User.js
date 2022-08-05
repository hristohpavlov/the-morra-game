const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        maxlength: [32, 'The username cannot exceed 32 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an e-mail'],
        uniquie: true,
        maxlength: [40, 'The e-mail cannot exceed 40 characters'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a valid password'],
        maxlength: [32, 'The password cannot exceed 32 characters'],
    },
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);