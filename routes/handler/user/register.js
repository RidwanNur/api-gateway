const {urlServiceUser} = require('../../apiAdapter');
const {URL_SERVICE_USER} = process.env;


module.exports = async (req, res) => {
    try{
        const registerUser = await urlServiceUser.post(URL_SERVICE_USER + `/users/register`, req.body);
        return res.json(registerUser.data);
    }
    catch(error){
        if(error.code === 'ECONNREFUSED'){
            return res.status(500).json({status:'Error' , message:"Service Unavailable"});
        }
        const {status, data } = error.response;
        return res.status(status).json(data);
    }
};