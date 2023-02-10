const arguments = process.argv;
const { json, urlencoded } = require('express')
const express = require('express');
const mysql2 = require('mysql2');
const app = express();
const fs = require('fs');
const upload = require('./middleware/multer');


//db connnection
const connnection = mysql2.createConnection({
    host: 'localhost',
    user: 'USERNAME',
    password: 'PASSWORD',
    database: 'DATABASE'
});
//api 
app.post("/upload", upload, async (req, res) => {
    try {
        //table create 
        const createTable = `create table file_store(file_id int, file_name varchar(200),file_object blob,upload_date_time datetime,source varchar(200));`;
        connnection.query(createTable, (err, result) => {
            if (err) {
                console.error("Error in Table Creation", err);
            } else {
                console.log("Table created successfully !!")
            }
        });
        //insert data in table 

        const insertData = `INSERT INTO file_store(file_id,file_name, file_object, upload_date_time,source)
        VALUES(?,?,?,?,?)`;
        const values = [Math.floor(Math.random() * 100), req.file.filename, Buffer.from(fs.readFileSync(req.file.path)), new Date(), arguments[3]];

        connnection.query(insertData, values, (err, result) => {
            if (err) {
                console.error("Data insert error ", err);
            }
            else {
                console.log(`File "${req.file.filename}" has been upload successfully..`)
                connnection.connect(function (err) {
                    if (err) throw err;
                    connnection.query("select * from carrier.file_store WHERE `upload_date_time` > NOW() - INTERVAL 15 MINUTE;", function (err, result, fields) {
                        if (err) throw err;
                        return res.status(200).send(result)                   
                     });
                });
            }
        });
    } catch (error) {
        console.error("Error in file upload!!", error);
    }
});

app.listen(1000);
