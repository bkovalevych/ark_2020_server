const router = require('./router');
const management = require('../businessLayer/user/farmManagement')
const Farm = require('../models/farm');
const farmName = 'Farm';

function setCollection(req, res, next) {
    req.collection = Farm;
    req.collectionName = farmName;
    next()
}

module.exports = router(management, setCollection);