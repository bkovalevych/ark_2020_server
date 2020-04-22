const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FoodSchema = new Schema({
    capacity: Schema.Types.Decimal,
    foodType: String,
    timestamp: {type: Schema.Types.Date, required: true}
});

module.exports = Food = mongoose.model('Food', FoodSchema);
