const router = require('./router');
const management = require('../businessLayer/user/farmManagement')
const Cage = require('../models/cage');
const cageName = 'Cage';

function setCollection(req, res, next) {
    req.collection = Cage;
    req.collectionName = cageName;
    next()
}

module.exports = router(management, setCollection)
