const CommonInfo = require('../../models/commonInfo');
const User = require('../../models/user');
const IotController = require('../../models/iotController');
const Farm = require('../../models/farm');
const Cage = require('../../models/cage');


let lastCommonInfo = null;

let interval = setInterval(async () => {
    let asyncOperations = [
        User.count(),
        Cage.count(),
        Farm.count(),
        IotController.count()
    ];
    Promise.all(asyncOperations)
        .then(results => {
            let objectData = {
                numberUsers: results[0],
                numberCages: results[1],
                numberFarms: results[2],
                numberControllers: results[3]
            };
            return CommonInfo.create(objectData)
        }).then(lastInfo => {
            lastCommonInfo = lastInfo;
    })
}, 60 * 60 * 1000)