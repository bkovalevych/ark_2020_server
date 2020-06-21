const configIot = require("./configIot");
const feedConfig = require('./feedConfig');
const remote = require('./remote')
const configUser = require('./configUser');
const processData = require('./processData');
const onDisconnect = require('./onDisconnect');

let all_sockets = {};
let socket_user = {};

module.exports = function(server) {
    const io = require('socket.io')(server);
    io.on('connection', client => {
        all_sockets[client.id] = client;
        console.log(`connected ${client.id}`);
        client.on("configIot", data => {
            configIot(data, client, all_sockets);
        })
        client.on('feedConfig', res => {
            feedConfig(res, all_sockets);
        })
        client.on('remote', remoteData => {
            remote(remoteData, all_sockets);
        })
        client.on("configUser", userData => {
            configUser(userData, socket_user, client);
        });
        client.on("feedResponse", feed_data => {
            processData("feedResponse", feed_data, client, all_sockets);
        });
        client.on("animalData", animalData => {
            processData("animalData", animalData, client, all_sockets);
        })
        client.on("cageData", cageData => {
            processData("cageData", cageData, client, all_sockets);
        })
        client.on("disconnect", () => {
            onDisconnect(client, all_sockets, socket_user);
        })
        client.emit("time", Date.now());
        client.emit("setValue", {name: "idSocket", value: client.id})
    })
}
