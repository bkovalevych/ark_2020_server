const User = require("../../models/user");

module.exports = function(userData, socket_user, client) {
    User.findOne({_id: userData.idUser}).then(user => {
        if (user) {
            socket_user[client.id] = user._id.toString();
            user.sockets.push(client.id);
            user.save();
        }
    })
}