const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FoodSchema = new Schema({
    capacity: Schema.Types.Decimal,
    foodType: String,
    success: Schema.Types.Bool,
    timestamp: {type: Schema.Types.Date, Default: Date.now}
});

module.exports = FeedResponse = mongoose.model('FeedResponse', FoodSchema);
