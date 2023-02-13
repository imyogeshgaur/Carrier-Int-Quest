const multer = require('multer');
const {resolve,extname} = require('path');
const {v4} = require('uuid');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const pathToFolder = resolve("../backend/uploads")
        callback(null, pathToFolder);
    },
    filename: function (req, file, callback) {
        callback(null,  v4() + extname(file.originalname))
    }
})

const upload = multer({ storage }).array("files");
module.exports = upload;