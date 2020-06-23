const IotController = require("../../models/iotController");

module.exports = function(remoteData, all_sockets) {
    let id = remoteData._id;
    let humidity = remoteData.humidity;
    let temperature = remoteData.temperature;
    let idSocket = remoteData.idSocket;
    delete remoteData.temperature;
    delete remoteData.humidity;
    delete remoteData.idSocket;
    delete remoteData["_id"];
    if (all_sockets[idSocket]) {
        Object.keys(remoteData).map(name =>
            all_sockets[idSocket].emit('setValue', {"name": name, "value": remoteData[name]})
        )
        if (humidity) {
            all_sockets[idSocket].emit('remote', {"temperature": parseFloat(temperature), "humidity": parseFloat(humidity) })
        }
    }
    IotController.findOne({_id: id}).then(iotResult => {
        Object.assign(iotResult, remoteData)
        iotResult.save()
    }).catch(err => console.log(err.toString()))
}