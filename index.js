const server = require('express')();
const serverHttp = require('http').createServer(server)
const dotenv = require('dotenv');
dotenv.config();
const port = parseInt(process.env.PORT || 5000);
const cors = require("cors");
const bodyParser = require('body-parser');
const middleCookies = require('universal-cookie-express')

server.use(cors(
     // some legacy browsers (IE11, various SmartTVs) choke on 204
 ));


server.use(middleCookies())
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
require('./data_accesss/connectDB');
require('./businessLayer/iot/iotManagement')(serverHttp);




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
