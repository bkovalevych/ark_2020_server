const IotController = require("../../models/iotController");

module.exports = function(res, all_sockets) {
    let iot = res.iot;
    if (all_sockets[iot.idSocket]) {
        all_sockets[iot.idSocket].emit("feedConfig", res['foodSchedule']);
    }
    IotController.findOne({_id: iot._id}).then(result => {
        result.foodSchedule = res["foodSchedule"];
        result.specification = "feedSystem";
        result.save();
    }).catch(err => console.log(err.toString()))
}