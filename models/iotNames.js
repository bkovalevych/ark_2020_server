const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IotNamesSchema = new Schema({
    timestamp: {type: Date, default: Date.now}
});

module.exports = IotNames = mongoose.model('IotNames', IotNamesSchema);