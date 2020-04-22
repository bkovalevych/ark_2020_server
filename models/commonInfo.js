const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CommonInfoSchema = new Schema({
    timestamp: {type: Date, default: Date.now},
    numberUsers: Schema.Types.Number,
    numberCages: Schema.Types.Number,
    numberFarms: Schema.Types.Number,
    numberControllers: Schema.Types.Number,
    feedback: [{
        timestamp: {type: Date, default: Date.now},
        message: String,
        login: String
    }]
});

module.exports = CommonInfo = mongoose.model('CommonInfo', CommonInfoSchema);
