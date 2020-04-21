const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    registered: {type: Date, default: Date.now},
    name: String,
    login: {
        type: String,
        required: [true, 'Your nickname can not be blank'],
        unique: [true, 'User is already exists']
    },
    local: String,
    language: String,
    publicKey: String,

    notifications: [{
        text: String,
        time: {type: Date, default: Date.now}
    }]
});

module.exports = User = mongoose.model('User', UserSchema);
