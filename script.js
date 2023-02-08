const arguments = process.argv
const { Sequelize, DataTypes } = require("sequelize")
const sequelize = new Sequelize("mysql://USERNAME:PASSWORD@localhost:3306/training")
const fs = require("fs")

const readFile = async (val) => {
    try {
        var oldPath = val
        var newPath = './upload/pic.jpg'
        
        fs.copyFile(oldPath, newPath, function (err) {
            if (err) throw err
            else {
                uploadToDb(Buffer.from(fs.readFileSync(newPath)),val);
            }
        })
    } catch (error) {
        console.log("Directory Upload  Error : ", error)
    }
}

const uploadToDb = async (file,oldPath) => {
    try {
        var newPath = './upload/pic.jpg'
        const file_store = sequelize.define("file_store", {
            file_name:{
                type:DataTypes.STRING,
            },
            file_object: {
                type: DataTypes.BLOB
            },
            upload_date_time:{
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            },
            source:{
                type:DataTypes.STRING
            }
        },{ 
            timestamps: true
    })
        file_store.sync({alter:true});
        await file_store.create({
            file_name:newPath.substring(9),
            file_object:file,
            source:oldPath
        })
        console.log("Successfully uploaded")
    } catch (error) {
        console.log("'Error occurred:", error)
    }
}

readFile(arguments[3])