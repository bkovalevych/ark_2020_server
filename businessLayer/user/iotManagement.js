const IotController = require('../../models/iotController');
const IotNames = require('../../models/iotNames');
const CageData = require('../../models/cageData');
const AnimalData = require('../../models/animalData');
const addLog = require('../../crossFunction/addLog');

let objectModule = {};

const createName = async () => {
    let name = '';
    let ms = new Date().getTime() + 10 * 60 * 1000;
    let tenMinutesAgo = new Date(ms);
    await  IotNames.deleteMany({timestamp: {$lt: tenMinutesAgo}});
    await IotNames.create({}).then(nameObject => {
        name = nameObject._id.toString()
    });
    return name;
};

objectModule.getNameIot = async (req, res) => {
  let name = await createName();
  addLog(`${name}`, 'create iotName');
  res.send(name);
};

objectModule.registerIot = (req, res) => {
    let name = req.body.nameIot;
    let idUser = req.user._id.toString();
    IotNames.findOneAndDelete({_id: name})
        .then(nameInTable => {
            if (nameInTable == null) {
                addLog(`Name ${name} is incorrect for user ${req.user.login}`, 'registerIot error');
                res.status(400).json({errors: "Your name is incorrect or has expired."})
            }
            return IotController.create({
                name: name,
                idUser: idUser
            })
        })
        .then(iotController => {
            res.json(iotController)
        })
        .catch(err => {
            addLog('error with db', 'registerIot error');
            res.status(400).json({errors: err});
        })
};

const addToTable = (req, res, iot) => {
    let objectData = {
        idCage: iot.idCage
    };
    switch (iot.specification) {
        case 'cageData':
            objectData.temperature = req.body.temperature;
            objectData.humidity = req.body.humidity;
            objectData.weight = req.body.weight;
            CageData.create(objectData).exec();
            break;
        case 'animalData':
            objectData.activity = req.body.activity;
            objectData.temperature = req.body.temperature;
            objectData.humidity = req.body.humidity;
            AnimalData.create(objectData).exec();
            break;
    }
};

objectModule.handleData = (req, res) => {
    let name = req.body.nameIot;
    IotController.findOne({name: name})
        .then(iot => {
            if (iot == null) {
                addLog(`iot ${name} not found`, 'handle data error');
                res.status(400).send(`iot ${name} not found`);
            } else {
                addToTable(req, res, iot);
                req.status(200).send('ok');
            }
        })
};

objectModule.setCageForIot = (req, res) => {
    let idUser = req.user._id.toString();
    let idCage = req.body.idCage;
    let nameIot = req.body.nameIot;

    IotController.findOne({name: nameIot, idUser: idUser})
        .then(iot => {
            if (iot == null) {
                addLog(`Iot ${nameIot} not found`, 'setCageForIot error');
                res.status(400).send(`Iot ${nameIot} not found`);
            } else {
                iot.idCage = idCage;
                iot.save().exec();
                addLog(`Iot ${nameIot} linked to ${idCage}`, 'setCageForIot');
                res.send('ok');
            }
        })
        .catch(err => {
            addLog('error with db', 'setCageForIot error');
            res.status(500).send('error with db');
        })
};

module.exports = objectModule;
