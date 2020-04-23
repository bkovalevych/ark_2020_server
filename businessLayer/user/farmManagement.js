const addLog = require('../../crossFunction/addLog');

const addOperation = (req, res) => {
    if (req.body == null) {
        addLog('Object is required', `${req.collectionName} post error`);
        res.status(400).json({errors: "Object is required"})
    }
    let obj = Object.assign(
        {idUser: req.user._id.toString()},
        req.body
        );
    req.collection.create(obj).then(created => {
        addLog('created object', `${req.collectionName} post ok`);
        res.json(created);
    }).catch(err => {
        addLog('Error with db', `${req.collectionName} post error`);
        res.status(400).json(err)
    })
};

const getById = (req, res, next) => {
    let idObject = req.params['id'];
    if (idObject == null) {
        addLog('Id is not defined', `${req.collection.name} get error`);
        res.status(400).json({errors: 'Id is not defined'})
    }
    req.collection.findOne({_id: idObject}).then(findObject => {
        if (findObject == null) {
            addLog('Not found', `${req.collection.name} get error`);
            res.status(400).json({errors: 'Not found'});
        } else
            req.findObject = findObject;
            next()
    })
};


const changeOperation = (req, res) => {
    let findObject = req.findObject;
    let changed = req.body.putObject;
    if (changed == null) {
        addLog('putObject is not defined', `${req.collection.name} put error`);
        res.status(400).json({errors: 'putObject is not defined'})
    } else {
        delete changed._id;
        delete changed.idUser;
        delete changed.registered;
        Object.assign(findObject, changed);
        findObject.save();
        addLog('ok', `${req.collection.name} put`);
        res.json({data: 'Object changed'});
    }
};

const deleteOperation = (req, res) => {
    let delObjects = req.body.deleteObjects;
    req.collection.deleteMany({_id: {$in: delObjects}, idUser: req.user._id.toString()}).then(result => {
        addLog('ok', `${req.collectionName} delete`);
        res.json(result)
    }).catch(err => {
        addLog('error with db', `${req.collectionName} delete error`);
        res.status(500).json(err)
    })
};

module.exports = {addOperation: addOperation, getById: getById, changeOperation: changeOperation, deleteOperation: deleteOperation};