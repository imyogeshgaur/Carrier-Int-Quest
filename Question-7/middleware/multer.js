const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function(req,file,callback){
        const pathTofolder = path.resolve('../Soluction-4/upload');
        callback(null,pathTofolder); 
    },
    filename: function(req,file,callback){
        callback(null,file.originalname)
    }
})

const upload = multer({storage}).single("file");
module.exports = upload;