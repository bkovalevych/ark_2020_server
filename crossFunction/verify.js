const verify_uri = 'https://oauth2.googleapis.com/tokeninfo?id_token=';
const axios = require('axios');
const addLog = require('./addLog');

module.exports = async (token) => {
    let result = null;
    await axios.get(verify_uri + token).then(resp => {
        result = resp.data;
        if (result['error'] || result['aud'] !== process.env.CLIENT_ID) {
            addLog('invalid token', 'verify');
            result = null;
        }
    }).catch(err => {
        addLog(err.toString(), 'verify');
    })
    return result;
}
