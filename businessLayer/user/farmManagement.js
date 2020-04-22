const addOperation = (req, res) => {
    if (req.body.addObject == null) {
        res.status(400).json({errors: "Object is required"})
    }
    let obj = Object.assign(
        {idUser: req.user._id.toString()},
        req.body.addObject
        );
    req.collection.create(obj).then(created => {
        res.json(created);
    }).catch(err => {
        res.status(400).json(err)
    })
};

const getById = (req, res, next) => {
    let idObject = req.params['id'];
    if (idObject == null) {
        res.status(400).json({errors: 'Id is not defined'})
    }
    req.collection.findOne({_id: idObject}).then(findObject => {
        if (findObject == null) {
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
        res.status(400).json({errors: 'putObject is not defined'})
    } else {
        delete changed._id;
        delete changed.idUser;
        delete changed.registered;
        Object.assign(findObject, changed);
        findObject.save();
        res.json({data: 'Object changed'});
    }
};

const deleteOperation = (req, res) => {
    let delObjects = req.body.deleteObjects;
    req.collection.deleteMany({_id: {$in: delObjects}, idUser: req.user._id.toString()}).then(result => {
        res.json(result)
    }).catch(err => {
        res.status(500).json(err)
    })
};

module.exports = {addOperation: addOperation, getById: getById, changeOperation: changeOperation, deleteOperation: deleteOperation};