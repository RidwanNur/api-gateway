const jwt = require('jsonwebtoken');
const {urlServiceUser} = require('../../apiAdapter');
const {
    URL_SERVICE_USER,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;

// const api = apiAdapter(URL_SERVICE_USER);

const HandlerRefreshToken = async () => {
    try {
        const {refresh_token, email} = req.body;

        if(!refresh_token || !email){
            res.status(400).json({
                status:'error',
                message: 'invalid token'
            });
        };
        await urlServiceUser.get(URL_SERVICE_USER + '/refreshTokens',{param: {refresh_token}});


    } catch (error) {
        if(error.code === 'ECONNREFUSED'){
            return res.status(500).json({status:'Error' , message:"Service Unavailable"});
        }
        const {status, data } = error.response;
        return res.status(status).json(data);
    }
}

module.exports = {
    HandlerRefreshToken,
}
