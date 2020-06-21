const User = require('../models/user');
const verify = require('./verify');
const addLog = require('./addLog')

module.exports = (req, res, next) => {
    let tok = req.headers.cookie;
    if (!tok) {
        tok = req.universalCookies.cookies['token']
    }
    if (!tok) {
        addLog('token not defined', 'userDefiner')
        res.status(400).json({errors: "Token not defined."});
        return;
    }
    verify(tok).then(userData => {
        if (!userData) {
            res.status(400).json({errors: "User not defined."});
        } else {
            return User.findOne({googleId: userData['sub']})
        }
    }).then(user => {
        if (user == null) {
            res.status(500).json({errors: "User not found"});
        } else {
            req.user = user;
            next()
        }
    });

};