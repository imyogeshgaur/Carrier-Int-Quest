const arguments = process.argv;
const { urlencoded, json } = require("express");
const mysql2 = require("mysql2");
const express = require("express");
const upload = require("./middleware/upload");
const fs = require('fs');
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "carrier",
});

app.post("/upload", upload, async (req, res) => {
    try {
        // Create Table

        const createTable = `create table file_store(file_name varchar(255), file_object blob, upload_date_time datetime,source varchar(255));`;

        connection.query(createTable, (err, result) => {
            if (err) {
                console.error("Table Creation Error : ", err);
            } else {
                console.log(`Table Created Successfully !!!`);
            }
        });

        //Insert Data To Table
        const insertTable = `INSERT INTO file_store (file_name, file_object, upload_date_time, source) 
        VALUES (?, ?, ?, ?)`;

        const values = [req.file.filename, Buffer.from(fs.readFileSync(req.file.path)), new Date(), arguments[3]];

        connection.query(insertTable, values, (err, result) => {
            if (err) {
                console.error("File Insert Error : ", err);
                return;
            } else {
                console.log(
                    `File "${req.file.filename}" has been uploaded successfully.`
                );
                return res.status(200).send({ message: `File "${req.file.filename}" has been uploaded successfully.` })
            }
        });
    } catch (error) {
        console.log("File Upload Error !!!", error);
    }
});

app.listen(2000);
