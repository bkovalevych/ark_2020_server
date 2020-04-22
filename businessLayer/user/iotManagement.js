const IotController = require('../../models/iotController');
const IotNames = require('../../models/iotNames');
let objectModule = {};

const createName = async () => {
    let name = '';
    let ms = new Date().getTime() + 10 * 60 * 1000;
    let tenMinutesAgo = new Date(ms);
    await  IotNames.deleteMany({timestamp: {$lt: tenMinutesAgo}})
    await IotNames.create({}).then(nameObject => {
        name = nameObject._id.toString()
    });
    return name;
};

objectModule.getNameIot = async (req, res) => {
  let name = await createName();
  res.send(name);
};

objectModule.registerIot = (req, res) => {
    let name = req.body.nameIot;
    let idUser = req.user._id.toString();
    IotNames.findOneAndDelete({_id: name})
        .then(nameInTable => {
            if (nameInTable == null) {
                res.status(400).json({errors: "Your name is incorrect or has expired."})
            }
            return IotController.create({
                name: name,
                idUser: idUser
            })
        })
        .then(iotController => {
            res.json(iotController)
        })
        .catch(err => {
            res.status(400).json({errors: err});

        })

};

module.exports = objectModule;
