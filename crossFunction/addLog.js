const Logs = require('../models/logs');

module.exports = (msg, tag) => {
  console.log(`[${tag}] ${msg}`);
  Logs.create({message: msg, tag: tag})
};