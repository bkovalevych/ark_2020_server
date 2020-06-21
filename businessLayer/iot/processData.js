const User = require("../../models/user");
const IotController = require("../../models/iotController");
const FeedResponse = require("../../models/feedResponse");
const CageData = require("../../models/cageData");
const AnimalData = require("../../models/animalData");


module.exports = function(type, payload, client, all_sockets) {
    let controller = null
    let user = null;
    IotController.findOne({idSocket: client.id}).then(result => {
        controller = result;
        if (controller) {
            controller["temperature"] = payload['temperature'];
            controller["weight"] = payload['weight'];
            controller['activity'] = payload['activity'];
            controller['humidity'] = payload['humidity'];
            if (controller['specification'] === "feedSystem") {
                controller['lastFeedTime'] = payload['lastFeedTime'];
            }
            controller.save().then().catch();
            return User.findOne({_id: controller.idUser});
        }
    }).then(userResult => {
        user = userResult;
        if (user) {
            if (payload["errors"]) {
                user.notifications.push(payload);
                return user.save();
            } else {
                let collection;
                if (type === "cageData") {
                    collection = CageData;
                } else if (type === "animalData") {
                    collection = AnimalData;

                } else {
                    payload['success'] = true;
                    delete payload['timestamp'];
                    collection = FeedResponse;
                }
                payload["idUser"] = user["_id"].toString();
                payload["idCage"] = controller['idCage'].toString();
                return collection.create(payload)
            }
        }
    }).then(data => {
        if (payload["errors"]) {
            payload.timestamp = Date.now();
            data = payload;
        }
        if (user && user.sockets) {
            user.sockets.map(id_socket => {
                all_sockets[id_socket].emit(type, data);
            })
        }
    })
}