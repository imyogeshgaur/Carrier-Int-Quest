const arguments = process.argv
const fs = require("fs")
const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'USERNAME',
    password: 'PASSWORD',
    database: 'DATABASE'
});

const readFile = async (val) => {
    try {
        var oldPath = val
        var newPath = './upload/git.txt'

        fs.copyFile(oldPath, newPath, function (err) {
            if (err) throw err
            else {
                uploadToDb(Buffer.from(fs.readFileSync(newPath)), oldPath, newPath);
            }
        })
    } catch (error) {
        console.log("Directory Upload  Error : ", error)
    }
}

const uploadToDb = async (file_object, source, file_name) => {
    try {
        //Create table 

        const createTable = `create table file_store(file_id int,file_name varchar(255), file_object blob, upload_date_time datetime,source varchar(255));`

        connection.query(createTable, (err, result) => {
            if (err) {
                console.error("Table Creation Error : ", err);
            } else {
                console.log(`Table Created Successfully !!!`);
            }
        });

        //Insert Data To Table 
        const insertTable = `INSERT INTO file_store (file_id,file_name, file_object, upload_date_time, source) 
        VALUES (?,?, ?, ?, ?)`;

        const values = [
            Math.floor(Math.random(10) * 100),
            file_name.substring(9),
            file_object,
            new Date(),
            source
        ];

        connection.query(insertTable, values, (err, result) => {
            if (err) {
                console.error("File Insert Error : ", err);
                return
            } else {
                console.log(`File "${file_name.substring(9)}" has been uploaded successfully.`);
            }
        });
    } catch (error) {
        console.log("Mysql Upload  Error : ", error)
    }//display database record last 15 min 
    connection.connect(function (err) {
        if (err) throw err;
        connection.query("select * from carrier.file_store WHERE `upload_date_time` > NOW() - INTERVAL 15 MINUTE;", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    }

    )
}

readFile(arguments[3])