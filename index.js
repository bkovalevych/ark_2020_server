const server = require('express')();
const dotenv = require('dotenv');
dotenv.config();
const port = parseInt(process.env.PORT);
const cors = require("cors");
const bodyParser = require('body-parser');

server.use(cors());
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());
require('./data_accesss/connectDB');
server.use('/farm', require('./api/farm'));
server.use('/user', require('./api/user'));
server.use('/cage', require('./api/cage'));
server.use('/commonInfo', require('./api/commonInfo'));
server.use('/admin', require('./api/admin'));
server.use('/data', require('./api/data'));
server.use('/iot', require('./api/iot'));

server.listen(port, () => {
   console.log(`Server listen on ${port}`)
});
