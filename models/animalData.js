const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AnimalDataSchema = new Schema({
    timestamp: {type: Date, default: Date.now},
    idCage: {type: Schema.Types.ObjectId, ref: "Cage"},
    activity: {type: Schema.Types.Mixed},
    temperature: Schema.Types.Decimal,
});

module.exports = AnimalData = mongoose.model('AnimalData', AnimalDataSchema);
