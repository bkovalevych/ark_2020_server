const iotManagement = require('../businessLayer/user/iotManagement');
const IotController = require('../models/iotController');
const Router = require('./router')

const setCollection = (req, res, next) => {
    req.collectionName = "IotController"
    req.collection = IotController
    next();
}

let router = Router(iotManagement, setCollection);

router.get('/getName', iotManagement.getNameIot);

module.exports = router;