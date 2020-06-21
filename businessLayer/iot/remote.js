const IotController = require("../../models/iotController");

module.exports = function(remoteData, all_sockets) {
    let id = remoteData._id;
    let humidity = remoteData.humidity;
    let temperature = remoteData.temperature;
    delete remoteData.temperature;
    delete remoteData.humidity;
    delete remoteData["_id"];
    if (all_sockets[remoteData["idSocket"]]) {
        Object.keys(remoteData).map(name =>
            all_sockets[remoteData["idSocket"]].emit('setValue', {"name": name, "value": remoteData[name]})
        )
        if (humidity) {
            all_sockets[remoteData["idSocket"]].emit('remote', {"temperature": temperature, "humidity": humidity })
        }
    }
    IotController.findOne({_id: id}).then(iotResult => {
        Object.assign(iotResult, remoteData)
        iotResult.save()
    }).catch(err => console.log(err.toString()))
}