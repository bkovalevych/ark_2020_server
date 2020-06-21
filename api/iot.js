const iotManagement = require('../businessLayer/user/iotManagement');
const IotController = require('../models/iotController');
const CageData = require('../models/cageData');
const AnimalData = require('../models/animalData');

const Router = require('./router')

const setCollection = (req, res, next) => {
    req.collectionName = "IotController";
    req.collection = IotController;
    next();
}

let router = Router(iotManagement, setCollection);
router.get("/special", require("../crossFunction/userDefiner"), )

function onError(err, res) {
    res.status(500).send(err.toString())
}
function findControllers (req, res, next) {
    IotController.find({idUser: req.user._id.toString()}).then(controllers => {
        if (controllers) {
            req.controller = controllers;
            req.controllersMap = controllers
                .reduce((prev, val) => {
                    if (val["idCage"])
                        prev[val["idCage"]] = val;
                    return prev
                }, {})
            next()
        } else {
            res.json([]);
        }
    }).catch(err => onError(err, res));
}



module.exports = router;