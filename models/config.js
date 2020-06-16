const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const configSchema = new Schema({
    registered: {type: Date, default: Date.now},
    CLIENT_ID: String,
    DB_URI: String,
    otherValues: Schema.Types.Mixed
})

module.exports = Config = mongoose.model('Configuration', configSchema)