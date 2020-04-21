const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CageSchema = new Schema({
    registered: {type: Date, default: Date.now},
    name: String,
    idFarm: {type: Schema.Types.ObjectId, ref: "Farm"},
    idUser: {type: Schema.Types.ObjectId, ref: "User"},
    capacity: Schema.Types.Number,
    contains: Schema.Types.Number
});

module.exports = Farm = mongoose.model('Cage', CageSchema);
