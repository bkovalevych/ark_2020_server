const router = require('express').Router();
const AnimalData = require('../models/animalData')
const FeedResponse = require('../models/feedResponse')
const CageData = require('../models/cageData')
const iotDefiner = require('../crossFunction/iotDefiner');
const userDefiner = require('../crossFunction/userDefiner');
const dataManagement = require('../businessLayer/user/data');
const query = require('../crossFunction/query');
const setCollection = (req, res, next) => {
    let collectionName = req.query['collection'];
    req.collectionName = collectionName;
    req.user = null;
    delete req.query['collection'];
    switch (collectionName) {
        case 'AnimalData':
            req.collection = AnimalData;
            break;
        case 'FeedResponse':
            req.collection = FeedResponse;
            break;
        case 'CageData':
            req.collection = CageData;
            break;
    }
    next()
};



router.route('/')
    .get([userDefiner, setCollection, query])
    .post(
        iotDefiner,
        dataManagement.addOperation
    );

module.exports = router;