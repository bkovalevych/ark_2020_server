const router = require('express').Router();
const Logs = require('../models/logs');
const query = require('../crossFunction/query');

router.get(
    '/logs',
    (req, res, next) => {
        req.collection = Logs;
        next()
    },
    query
);

router.post('/login', (req, res) => {

});

module.exports = router;