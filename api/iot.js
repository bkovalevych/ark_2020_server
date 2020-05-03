const router = require('express').Router();
const iotManagement = require('../businessLayer/user/iotManagement');
const userDefiner = require('../crossFunction/userDefiner');
const IotController = require('../models/iotController');
const query = require('../crossFunction/query');
router.route('')
    .post(
        userDefiner,
        iotManagement.registerIot
    )
    .get(
        userDefiner,
        (req, res, next) => {
            req.collection = IotController;
            next();
        },
        query
    )
;

router.get('/getName', iotManagement.getNameIot);

module.exports = router;