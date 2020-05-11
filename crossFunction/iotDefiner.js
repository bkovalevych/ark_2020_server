const IotController = require('../models/iotController');
const addLog = require('../crossFunction/addLog');

module.exports = (req, res, next) => {
    let name = req.query['name'];
    IotController.findOne({name: name}).then(iot => {
        if (iot == null) {
            addLog(`iot not with name ${name} is not found`, 'iotDefiner');
            res.status(400).send(`iot not with name ${name} is not found`)
        } else {
            req.iot = iot;
            next();
        }
    }).catch(err => {
        addLog(`error ${err.toString()}`, 'iotDefiner');
        res.status(400).send(`${err.toString()}`)
    })
}