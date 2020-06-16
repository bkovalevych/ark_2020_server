const IotController = require('../../models/iotController');
const addLog = require('../../crossFunction/addLog');

let objectModule = {};

objectModule.getById = (req, res, next) => {
    IotController.findOne({_id: req.params.id}).then(iot => {
        if (iot == null) {
            addLog('iot not found', 'iotDefiner');
            res.status(4000).send('not found')
        } else {
            req.iot = iot;
            next();
        }
    })
};

objectModule.addOperation = (req, res) => {
    let idUser = req.user._id.toString();
    let ms = new Date().getTime() + 10 * 60 * 1000;
    let tenMinutesAgo = new Date(ms);
    IotController.deleteMany({registered: {$lt: tenMinutesAgo}, confirmed: false})
        .then(() => {
            return IotController.create({idUser: idUser})
        })
        .then(iotController => {
            res.json(iotController)
        })
        .catch(err => {
            addLog('error with db', 'registerIot error');
            res.status(400).json({errors: err});
        })
};


objectModule.changeOperation = (req, res) => {
    let findObject = req.iot;
    let changed = req.body;
    if (changed == null || Object.keys(changed).length === 0) {
        addLog('body is empty', 'changeOperation');
        res.status(400).json({errors: "body is empty"});
    } else {
        delete changed._id;
        changed.idUser = req.user._id.toString()
        Object.assign(findObject, changed);
        findObject.save();
        addLog('ok', `${req.collection.name} put`);
        res.json({data: "Object changed"});
    }
}

objectModule.deleteOperation = (req, res) => {
    let delObjects = req.body;
    req.collection.deleteMany({_id: {$in: delObjects}, idUser: req.user._id.toString()}).then(result => {
        addLog('ok', `${req.collectionName} delete`);
        res.json(result);
    }).catch(err => {
        addLog('error with db', `${req.collectionName} delete`);
        res.status(500).json(err);
    })
}



module.exports = objectModule;
