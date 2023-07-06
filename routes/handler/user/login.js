const {urlServiceUser} = require('../../apiAdapter');
const jwt = require('jsonwebtoken');
const {
    URL_SERVICE_USER,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED
    } = process.env;


module.exports = async (req, res) => {
    try {
        const loginUser = await urlServiceUser.post(URL_SERVICE_USER + `/users/login`, req.body);
        const data = loginUser.data.data;
        // console.log(urlServiceUser);

        const token = jwt.sign({data}, JWT_SECRET, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED});
        const refreshToken = jwt.sign({data}, JWT_SECRET_REFRESH_TOKEN, {expiresIn: JWT_REFRESH_TOKEN_EXPIRED});
        
        await urlServiceUser.post(URL_SERVICE_USER + `/refreshTokens/createToken/`, {refresh_token: refreshToken, user_id : data.id});
        console.log(urlServiceUser);
        return res.json({
            status : 'success',
            data : { 
                    token,
                    refresh_token: refreshToken
                }
        });
    }
    catch(error){
        if(error.code === 'ECONNREFUSED'){
            return res.status(500).json({status:'Error' , message:"Service Unavailable"});
        }
        const {status, data } = error.response;
        return res.status(status).json(data);
    }
};