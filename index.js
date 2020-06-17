const server = require('express')();
const serverHttp = require('http').createServer(server)
const dotenv = require('dotenv');
dotenv.config();
const port = parseInt(process.env.PORT || 5000);
const cors = require("cors");
const bodyParser = require('body-parser');
const middleCookies = require('universal-cookie-express')
const IotController = require("./models/iotController");
const User = require("./models/user");
const CageData = require('./models/cageData');
const AnimalData = require('./models/animalData');
const FeedResponse = require("./models/feedResponse");
const processData = (type, payload, client) => {
    let controller = null
    let user = null;
    IotController.findOne({idSocket: client.id}).then(result => {
        controller = result;
        if (controller) {
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

server.use(cors(
     // some legacy browsers (IE11, various SmartTVs) choke on 204
 ));


server.use(middleCookies())
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
require('./data_accesss/connectDB');
const io = require('socket.io')(serverHttp);
let all_sockets = {};
let socket_user = {};
io.on('connection', client => {
    all_sockets[client.id] = client;
    console.log(`connected ${client.id}`);
    client.on("configIot", data => {
        let allParams = JSON.parse(data['data']);
        let controller = null;
        IotController.findOne({_id: allParams["id_controller"]})
            .then(controllerResult => {
                controller = controllerResult;
                if (controller) {
                    controller.confirmed = true;
                    controller.idSocket = client.id;
                    controller.save();
                    return User.findOne({_id: controller.idUser});
                } else {
                    client.emit("setValue", {name: "id_controller", value: ""});
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
    })
    client.on('remote', remoteData => {
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
    })
    client.on("configUser", userData => {
        User.findOne({_id: userData.idUser}).then(user => {
            if (user) {
                socket_user[client.id] = user._id.toString();
                user.sockets.push(client.id);
                user.save();
            }
        })
    });
    client.on("feedResponse", feed_data => {
        processData("feedResponse", feed_data, client);
    });
    client.on("animalData", animalData => {
        processData("animalData", animalData, client);
    })
    client.on("cageData", cageData => {
        processData("cageData", cageData, client);
    })
    client.on("remote", command => {
        if(all_sockets[command.id]) {
            all_sockets[command.id].emit("remote", command)
        } else {
            client.emit("remote", {errors: "Controller is not online"});
        }
    })
    client.on("disconnect", () => {
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
    })
    client.emit("time", Date.now());
    client.emit("setValue", {name: "socket_id", value: client.id})
})





server.use('/farm', require('./api/farm'));
server.use('/user', require('./api/user'));
server.use('/cage', require('./api/cage'));
server.use('/commonInfo', require('./api/commonInfo'));
server.use('/admin', require('./api/admin'));
server.use('/data', require('./api/data'));
server.use('/iot', require('./api/iot'));

serverHttp.listen(port, () => {
   console.log(`Server listen on ${port}`)
});
