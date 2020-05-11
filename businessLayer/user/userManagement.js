const User = require('../../models/user');
const addLog = require('../../crossFunction/addLog')
const verify = require('../../crossFunction/verify')
let objectModule = {};

objectModule.addUser = (req, res, next) => {
    let token = req.query['googleToken'];
    let objectUser = null;
    verify(token).then (userData => {
        objectUser = {
            login: userData['email'],
            name: userData['name'],
            picture: userData['picture'],
            locale: userData['locale'],
            googleId: userData['sub']
        };
        return User.findOne({googleId: userData['sub']});
    }).then(user => {
        if (user == null) {
            return User.create(objectUser);
        }
        return user;
    }).then(finalUser => {

        addLog(`user ${finalUser.name} signed`, 'addUser')
        res.json(finalUser);
    }).catch(err => {
        addLog(err.toString(), 'create User');
        res.status(500).json({errors: err});
    })
};

module.exports = objectModule;