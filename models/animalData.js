const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AnimalDataSchema = new Schema({
    timestamp: {type: Date, default: Date.now},
    idUser: {type: Schema.Types.ObjectId, ref: "User"},
    idCage: {type: Schema.Types.ObjectId, ref: "Cage"},
    activity: {type: Schema.Types.Mixed},
    temperature: Schema.Types.Decimal,
    humidity: Schema.Types.Decimal
});

module.exports = AnimalData = mongoose.model('AnimalData', AnimalDataSchema);
