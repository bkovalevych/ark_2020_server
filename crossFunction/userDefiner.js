const User = require('../models/user');

module.exports = (req, res, next) => {
    // TODO authenticate user
    if (req.headers.login == null) {
        res.status(400).json({errors: "User not defined."});
    } else {
        User.findOne({login: req.headers.login}).then(user => {
            if (user == null) {
                res.status(500).json({errors: "User not found"});
            } else {
                req.user = user;
                next()
            }
        })
    }
};