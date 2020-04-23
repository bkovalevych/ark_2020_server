const router = require('express').Router();
const Logs = require('../models/logs');
const query = require('../crossFunction/query');
const Feedback = require('../models/feedback');

router.get(
    '/logs',
    (req, res, next) => {
        req.collection = Logs;
        next()
    },
    query
);

router
    .get('/feedback',
        (req, res, next) => {
            req.collection = Feedback;
            next();
        },
        query
    );

module.exports = router;