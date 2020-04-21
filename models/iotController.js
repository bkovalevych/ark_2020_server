const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const IotControllerSchema = new Schema({
    registered: {type: Date, default: Date.now},
    name: String,
    idFarm: {type: Schema.Types.ObjectId, ref: "Farm"},
    idUser: {type: Schema.Types.ObjectId, ref: "User"},
    specification: Schema.Types.Mixed,
    sessionKey: String
});

module.exports = IotController = mongoose.model('iotController', IotControllerSchema);
