const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const IotControllerSchema = new Schema({
    registered: {type: Date, default: Date.now},
    name: String,
    idFarm: {type: Schema.Types.ObjectId, ref: "Farm"},
    idUser: {type: Schema.Types.ObjectId, ref: "User"},
    idCage: {type: Schema.Types.ObjectId, ref: "Cage"},
    specification: String,
    confirmed: {type: Schema.Types.Bool, default: false},
    idSocket: String,
    foodSchedule: Schema.Types.Mixed,
    temperature: Schema.Types.Decimal,
    humidity: Schema.Types.Decimal,
    activity: Schema.Types.Decimal,
    weight: Schema.Types.Decimal,
    lastFeedTime: Schema.Types.Number
});
module.exports = IotController = mongoose.model('iotController', IotControllerSchema);
