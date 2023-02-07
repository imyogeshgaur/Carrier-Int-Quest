const arguments = process.argv
const { Sequelize, DataTypes } = require("sequelize")
const sequelize = new Sequelize("mysql://PASSWORD:USERNAME@localhost:3306/rishabh")
const fs = require("fs")

const readFile = async (val) => {
    try {
        var oldPath = val
        var newPath = './upload/myself.jpg'

        fs.copyFile(oldPath, newPath, function (err) {
            if (err) throw err
            else {
                uploadToDb(Buffer.from(fs.readFileSync(newPath)));
            }
        })
    } catch (error) {
        console.log("Directory Upload  Error : ", error)
    }
}

const uploadToDb = async (file) => {
    try {
        const File = sequelize.define("File", {
            file: {
                type: DataTypes.BLOB
            }
        })
        File.sync();
        const upload = await File.create({
            file
        })
        console.log("File Uploaded Sucessfully !!!")
    } catch (error) {
        console.log("Mysql Upload  Error : ", error)
    }
}

readFile(arguments[3])