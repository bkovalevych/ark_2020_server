const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    registered: {type: Date, default: Date.now},
    name: String,
    googleId: {type: String,
        unique: [true, 'This id is already exists']},
    picture: String,
    login: {
        type: String,
        required: [true, 'Your nickname can not be blank'],
        unique: [true, 'User is already exists']
    },
    locale: String,
})

module.exports = Admin = mongoose.model('Admin', adminSchema)