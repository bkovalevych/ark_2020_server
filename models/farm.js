const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FarmSchema = new Schema({
    registered: {type: Date, default: Date.now},
    name: String,
    idUser: {type: Schema.Types.ObjectId, ref: "User"},
    location: String,
    animalKind: String
});

module.exports = Farm = mongoose.model('Farm', FarmSchema);
