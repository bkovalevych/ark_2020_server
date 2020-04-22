const Logs = require('../models/logs');

module.exports = (msg, tag) => {
  Logs.create({message: msg, tag: tag}).exec()
};