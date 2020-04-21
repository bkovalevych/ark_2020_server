const router = require('express').Router();
const query = require('../crossFunction/query')
const userDefiner = require("../crossFunction/userDefiner")
const Cage = require('../models/cage')

router.route('').get(
    userDefiner,
    (req, res, next) => {
        req.collection = Cage
        next()
    }
).post(
    userDefiner,

)

module.exports = router;