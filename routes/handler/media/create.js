const {urlServiceMedia} = require('../../apiAdapter');
const {URL_SERVICE_MEDIA} = process.env;

module.exports = async (req, res) => {
    try{
        const media = await urlServiceMedia.post(URL_SERVICE_MEDIA, req.body);
        return res.json(media.data);
    }
    catch(error){
        if(error.code === 'ECONNREFUSED'){
            return res.status(500).json({status:'Error' , message:"Service Unavailable"});
        }
        const {status, data } = error.response;
        return res.status(status).json(data);
    }
};