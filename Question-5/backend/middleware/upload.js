const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const pathToFolder = path.resolve("../backend/upload")
        callback(null, pathToFolder);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage }).single("file");
module.exports = upload;