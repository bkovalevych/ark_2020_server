const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogsSchema = new Schema({
    timestamp: {type: Date, default: Date.now},
    message: String,
    tag: String
});

module.exports = Logs = mongoose.model('Logs', LogsSchema);