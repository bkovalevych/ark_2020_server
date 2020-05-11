const CageData = require('../../models/cageData');
const AnimalData = require('../../models/animalData');
const FeedResponse = require('../../models/feedResponse');
const iotManagement = require('./iotManagement')
const addLog = require('../../crossFunction/addLog');
let objectModule = {};

objectModule.getById = iotManagement.getById;

objectModule.addOperation = (req, res) => {
    let specification = req.iot.specification
    let objectData = {idCage: req.iot.idCage.toString()};
    switch (specification) {
        case 'cageData':
            objectData.temperature = req.body.temperature;
            objectData.humidity = req.body.humidity;
            objectData.weight = req.body.weight;
            CageData.create(objectData).then(data => {res.send('ok')}).catch(err => {
                addLog('error with send cageData '+ err.toString(), 'addToTable');
                res.status(500).send('error')
            });
            break;
        case 'animalData':
            objectData.activity = req.body.activity;
            objectData.temperature = req.body.temperature;
            objectData.humidity = req.body.humidity;
            AnimalData.create(objectData).then(data => {res.send('ok')}).catch(err => {
                addLog('error with send animalData ' + err.toString(), 'addToTable');
                res.status(500).send('error')
            });
            break;
        case 'feedResponse':
            objectData.capacity = req.body.capacity;
            objectData.foodType = req.body.foodType;
            objectData.success = req.body.success;
            FeedResponse.create(objectData).then(data => {res.send('ok')}).catch(err => {
                addLog('error with send feedResponse ' + err.toString(), 'addToTable');
                res.status(500).send('error')
            })
    }
}



module.exports = objectModule;