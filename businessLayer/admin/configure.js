const config = require('../../models/config');
let obj = {};

obj.exportFunction = (req, res) => {
    config.findOne().then(result => {
        res.json(result);
    }).catch(err => {
        res.status(500).json({err: err.toString()});
    })
}

obj.importFunction = (req, res) => {
    config.findOne().then (result => {
        Object.assign(result, req.body)
        return result.save();
    }).then((result) => {
        res.json(result);
    })
}

module.exports = obj;