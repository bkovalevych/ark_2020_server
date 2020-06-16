const router = require('express').Router();
const Logs = require('../models/logs');
const query = require('../crossFunction/query');
const Feedback = require('../models/feedback');
const verify = require('../crossFunction/verify');
const Admin = require('../models/admin');
const addLog = require('../crossFunction/addLog');
const mongoose = require('mongoose');
require('../businessLayer/admin/data');
const config = require("../businessLayer/admin/configure");

const adminDefiner = (req, res, next) => {
    if (!req.universalCookies.cookies['token']) {
        addLog('token not defined', 'adminDefiner')
        res.status(400).json({errors: "Token not defined."});
        return;
    }
    verify(req.universalCookies.cookies['token']).then(userData => {
        if (!userData) {
            res.status(400).json({errors: "Admin is not defined."});
        } else {
            return Admin.findOne({googleId: userData['sub']})
        }
    }).then(user => {
        if (user == null) {
            res.status(400).json({errors: "Admin not found"});
        } else {
            req.user = user;
            next()
        }
    });
}

router.get(
    '/logs', adminDefiner,
    (req, res, next) => {
        req.collection = Logs;
        req.collectionName = "Logs";
        next()
    },
    query
);

router.get('/configuration', adminDefiner, config.exportFunction);
router.post('/configuration', adminDefiner, config.importFunction);

router.post('/login', (req, res) => {
    let token = req.body['token'];
    let prevUser = null;
    verify(token).then(result => {
        prevUser = result;
        return Admin.findOne({login: result['email']})
    }).then(admin => {
        if (admin == null) {
            res.status(400).json({errors: "You are not admin"});
        } else if (!admin['googleId']) {
            admin['googleId'] = prevUser['sub'];
            admin['picture'] = prevUser['picture'];
            admin['locale'] = prevUser['locale'];
            admin['name'] = prevUser['name'];
            admin.save()
            res.json(prevUser);
        } else {
            res.json(prevUser);
        }
    })
})

router.delete('/:id', adminDefiner, (req, res) => {
    let id = req.params['id'];
    Admin.deleteOne({_id: id}).then(result => {
        addLog('deleted', 'deleteAdmin');
        res.json(result);
    }).catch(err => {
        addLog(err.toString(), 'deleteAdmin');
        res.status(500).json({errors: err.toString()});
    })
})

router.route('/').
get(adminDefiner, (req, res, next) => {
    req.collection = Admin;
    req.collectionName = "ADMIN";
    next();
}, query).
post(adminDefiner, (req, res) => {
    if (!req.body['login']) {
        addLog("login is not defined", 'postAdmin');
        res.status(400).json({errors: "login is not defined"});
    } else {
        Admin.create(req.body).then(result => {
            res.json(result);
        }).catch(err => {
            addLog(err.toString(), 'postAdmin');
            res.status(500).json({errors: err.toString()});
        })
    }
})

router.get('/data/:collection', (req, res, next) => {
    req.collectionName = req.params['collection'];
    req.collection = mongoose.models[req.collectionName];
    if (req.collection == null) {
        addLog('collection is incorrect');
        res.status(500).json({error: 'collection is incorrect'});
    } else
        next();
}, query)

router
    .get('/feedback',
        (req, res, next) => {
            req.collection = Feedback;
            next();
        },
        query
    );

module.exports = router;