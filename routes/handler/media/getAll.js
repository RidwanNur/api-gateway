const {urlServiceMedia} = require('../../apiAdapter');
const {URL_SERVICE_MEDIA} = process.env;

module.exports = async (req, res) => {
    try{
        const media = await urlServiceMedia.get(URL_SERVICE_MEDIA);
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