const Farm = require('../../models/farm');

const addFarm = (req, res) => {
    if (req.body.addObject == null) {
        res.status(400).json({errors: "Object is required"})
    }
    let obj = Object.assign(
        {idUser: req.user._id.toString()},
        req.body.addObject
        );
    Farm.create(obj).then(farm => {
        res.json(farm);
    }).catch(err => {
        res.status(400).json(err)
    })
};

const getById = (req, res, next) => {
    let idFarm = req.params['id'];
    if (idFarm == null) {
        res.status(400).json({errors: 'IdFarm is not defined'})
    }
    Farm.findOne({_id: idFarm}).then(farm => {
        if (farm.idUser.toString() !== req.user._id.toString()) {
            res.status(400).json({errors: 'That is not your farm'});
        } else
            req.farm = farm;
            next()
    })
};


const changeFarm = (req, res) => {
    let farm = req.farm;
    let changed = req.body.putObject;
    if (changed == null) {
        res.status(400).json({errors: 'putObject is not defined'})
    } else {
        delete changed._id;
        delete changed.idUser;
        delete changed.registered;
        Object.assign(farm, changed);
        farm.save();
        res.json({data: 'Object changed'});
    }
};

const deleteFarm = (req, res) => {
    let delObjects = req.body.deleteObjects;
    Farm.deleteMany({_id: {$in: delObjects}, idUser: req.user._id.toString()}).then(result => {
        res.json(result)
    }).catch(err => {
        res.status(500).json(err)
    })
};

module.exports = {addFarm: addFarm, getById: getById, changeFarm: changeFarm, deleteFarm: deleteFarm};