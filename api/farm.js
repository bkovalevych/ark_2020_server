const router = require('express').Router();
const farmManagement = require('../businessLayer/user/farmManagement');
const userDefiner = require('../crossFunction/userDefiner')
const query = require('../crossFunction/query')
router.route('').get([
    userDefiner,
    (req, res, next) => {
      req.collection = farmManagement;
      next()
    },
    query
    ]
).post([
    userDefiner,
    farmManagement.addFarm
    ]
);

router.route('/:id')
    .get([userDefiner, farmManagement.getById], (req, res) => {
        res.json(req.farm)
    })
    .put([userDefiner, farmManagement.changeFarm])
    .delete([userDefiner, farmManagement.deleteFarm]);

module.exports = router;