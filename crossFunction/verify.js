const verify_uri = 'https://oauth2.googleapis.com/tokeninfo?id_token=';
const axios = require('axios');
const addLog = require('./addLog');

module.exports = async (token) => {
    return new Promise ((resolve, reject) => {
        axios.get(verify_uri + token)
            .then(resp => {
                let result = resp.data;
                if (result['error'] || result['aud'] !== process.env.CLIENT_ID) {
                    addLog('invalid token', 'verify');
                    result = null;
                    reject('invalid token');
                }
                resolve(result);
            }).catch(err => {
                addLog(err.toString(), 'verify');
                reject(err.toString());
            })
    })
}
