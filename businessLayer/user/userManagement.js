const User = require('../../models/user');
const addLog = require('../../crossFunction/addLog')
let objectModule = {};

objectModule.addUser = (req, res, next) => {
    let objectUser = {
        login: req.body.login,
        name: req.body.name
    };
    User.create(objectUser).then(user => {
        next();
    }).catch(err => {
        addLog(err.toString(), 'create User');
        res.status(500).json({errors: err});
    })
};

module.exports = objectModule;