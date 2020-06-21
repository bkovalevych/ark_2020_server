const User = require("../../models/user");
const IotController = require("../../models/iotController");

module.exports = function(client, all_sockets, socket_user) {
    IotController.findOne({idSocket: client.id}).then(iot => {
        if (iot) {
            iot.idSocket = null;
            iot.save();
            console.log(`iot ${client.id} disconnect`)
            return User.findOne({_id: iot.idUser});
        }
    }).then(user => {
        if (user && user.sockets) {
            user.sockets.map(id_socket => {
                all_sockets[id_socket].emit("iotOffline", client.id);
            })
        }
    })
    delete all_sockets[client.id];
    if (!socket_user[client.id]) {
        return;
    }
    User.findOne({_id: socket_user[client.id]}).then(user => {
        if (user) {
            let index = user.sockets.indexOf(client.id);
            console.log(`user ${client.id} disconnect`)
            user.sockets.splice(index, 1);
            user.save();
        }
    })
    delete socket_user[client.id];
}