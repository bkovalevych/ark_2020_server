const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CageDataSchema = new Schema({
    timestamp: {type: Date, default: Date.now},
    idCage: {type: Schema.Types.ObjectId, ref: "Cage"},
    temperature: Schema.Types.Decimal,
    humidity: Schema.Types.Decimal,
    weight: Schema.Types.Decimal
});

module.exports = CageData = mongoose.model('CageData', CageDataSchema);
