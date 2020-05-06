const user = require('express').Router();
const addLog = require('../crossFunction/addLog');
const userManagement = require('../businessLayer/user/userManagement');

user.get('/sign', userManagement.addUser, (req, res) => {
    res.json(req.user);
});

module.exports = user;