const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
        timestamp: {type: Date, default: Date.now},
        message: String,
        login: String
});

module.exports = Feedback = mongoose.model("Feedback", FeedbackSchema);