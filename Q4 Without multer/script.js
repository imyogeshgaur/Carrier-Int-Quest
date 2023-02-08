const arguments = process.argv;
const { urlencoded, json } = require("express");
const express = require("express");
// const upload = require("./middleware/upload");
const fs = require('fs');
const uploadToDb = require("./database");
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());


app.post("/upload", async (req, res, next) => {
    try {
        var oldPath = arguments[3]
        var newPath = './upload/myself.jpg'

        fs.copyFile(oldPath, newPath, function (err) {
            if (err) throw err
            else {
                next();
                const data = uploadToDb(Buffer.from(fs.readFileSync(newPath)), oldPath, newPath);
                if (data) {
                    res.status(200).send(`File ${newPath.substring(9)} Uploaded Suceesfully !!!`)
                } else {
                    res.status(200).send(`File ${newPath.substring(9)} Not Uploaded!!!`)
                }
            }
        })
    } catch (error) {
        console.log("File Upload Error !!!", error);
    }
});

app.listen(2000);
