const server = require('express')();
const dotenv = require('dotenv');
const port = parseInt(process.env.PORT);
const host = process.env.HOST;
dotenv.config();
require('./data_accesss/connectDB');
server.use('/farm', require('./api/farm'));


server.listen(port, host, () => {
   console.log(`Server listen on ${host}:${port}`)
});
