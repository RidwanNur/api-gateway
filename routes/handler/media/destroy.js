const {urlServiceMedia} = require('../../apiAdapter');
const {URL_SERVICE_MEDIA} = process.env;

module.exports = async (req, res) => {
    try{
        const {id} = req.params;
        console.log(URL_SERVICE_MEDIA + `/${id}`);
        const media = await urlServiceMedia.delete(URL_SERVICE_MEDIA + `/${id}`);
        return res.status(200).json({message: "Delete Successfully"});
    }
    catch(error){
        if(error.code === 'ECONNREFUSED'){
            return res.status(500).json({status:'Error' , message:"Service Unavailable"});
        }
        const {status, data } = error.response;
        return res.status(status).json(data);
    }
};