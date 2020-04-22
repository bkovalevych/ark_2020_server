const user = require('express').Router();
const addLog = require('../crossFunction/addLog');
user.post('/registered', (req, res) => {
    let login = req.body.login;
    addLog(`user with login ${login} registered`, 'register')
    res.status(200).send('ok');
});

user.post('/logged', (req, res) => {
   let login = req.body.login;
   addLog(`user ${login} logged at system`, 'login');
   res.status(200).send('ok');
});

module.exports = user;