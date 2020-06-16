const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FoodSchema = new Schema({
    idUser: {type: Schema.Types.ObjectId, ref: "User"},
    idCage: {type: Schema.Types.ObjectId, ref: "Cage"},
    capacity: Schema.Types.Number,
    foodType: String,
    timestamp: {type: Schema.Types.Number, required: true}
});

module.exports = Food = mongoose.model('Food', FoodSchema);
