const router = require('express').Router();
const farmManagement = require('../businessLayer/user/farmManagement');
const userDefiner = require('../crossFunction/userDefiner');
const query = require('../crossFunction/query');
const Farm = require('../models/farm');

const setCollection = (req, res, next) => {
    req.collection = Farm;
    req.projection = '_id idUser location animalKind name'
    req.collectionName = 'Farm';
    next()
};

router.route('/')
    .get(userDefiner, setCollection, query)
    .post(
        userDefiner,
        setCollection,
        farmManagement.addOperation
    );

router.route('/:id')
    .get(
        userDefiner,
        setCollection,
        farmManagement.getById,
        (req, res) => {
            res.json(req.findObject)
        })
    .put(
        userDefiner,
        setCollection,
        farmManagement.getById,
        farmManagement.changeOperation
    )
    .delete(
        userDefiner,
        setCollection,
        farmManagement.deleteOperation
    );

module.exports = router;