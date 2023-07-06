const axios = require('axios');

//note: timeout harus berupa number jika berupa string perlu diparsing ke number
const { TIMEOUT } = process.env;
const {URL_SERVICE_MEDIA} = process.env;
const {URL_SERVICE_USER} = process.env;

const urlServiceMedia = axios.create({
    baseUrl: URL_SERVICE_MEDIA,
    timeout: parseInt(TIMEOUT)
});

const urlServiceUser = axios.create({
    baseUrl: URL_SERVICE_USER,
    timeout: parseInt(TIMEOUT)
});


module.exports = {
    urlServiceMedia,
    urlServiceUser
};