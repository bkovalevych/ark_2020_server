const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FoodSchema = new Schema({
    idUser: {type: Schema.Types.ObjectId, ref: "User"},
    idCage: {type: Schema.Types.ObjectId, ref: "Cage"},
    capacity: Schema.Types.Number,
    foodType: String,
    success: Schema.Types.Bool,
    timestamp: {type: Schema.Types.Date, Default: Date.now}
});

module.exports = FeedResponse = mongoose.model('FeedResponse', FoodSchema);
