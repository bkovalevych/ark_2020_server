const IotController = require("../../models/iotController");
const User = require("../../models/user");

module.exports = function(data, client, all_sockets) {
    let allParams = JSON.parse(data['data']);
    let controller = null;
    IotController.findOne({_id: allParams["idController"]})
        .then(controllerResult => {
            controller = controllerResult;
            if (controller) {
                controller.confirmed = true;
                controller.idSocket = client.id;
                client.emit("setValue", {name: "idCage", value: controller.idCage});
                client.emit("setValue", {name: "specification", value: controller.specification});
                client.emit("setValue", {name: "idUser", value: controller.idUser});
                if (controller.specification === 'feedSystem') {
                    client.emit("feedConfig", controller.foodSchedule)
                }
                controller.save();
                return User.findOne({_id: controller.idUser});
            } else {
                client.emit("setValue", {name: "idController", value: ""});
            }
        })
        .then(user => {
            if (user && user.sockets) {
                let indexes = []
                user.sockets.map((id_socket, index) => {
                    if (all_sockets[id_socket]) {
                        all_sockets[id_socket].emit("iotOnline", controller)
                    } else {
                        indexes.push(index)
                    }
                })
                for (let key = indexes.length; key >= 0; --key) {
                    user.sockets.splice(indexes[key], 1);
                }
                user.save();
            }
        })
}