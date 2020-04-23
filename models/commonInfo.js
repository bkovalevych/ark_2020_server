const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CommonInfoSchema = new Schema({
    timestamp: {type: Date, default: Date.now},
    numberUsers: Schema.Types.Number,
    numberCages: Schema.Types.Number,
    numberFarms: Schema.Types.Number,
    numberControllers: Schema.Types.Number
});

module.exports = CommonInfo = mongoose.model('CommonInfo', CommonInfoSchema);
