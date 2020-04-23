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
    sessionKey: String,
    foodSchedule: [{type: Schema.Types.Object, ref: "Food"}]
});

module.exports = IotController = mongoose.model('iotController', IotControllerSchema);
