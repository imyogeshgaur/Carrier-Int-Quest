const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
    host: "localhost",
    user: "USERNAME",
    password: "PASSWORD",
    database: "DATABASE",
});

const uploadToDb = (file_object,source,file_name)=>{
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

        const values = [file_name.substring(9),file_object, new Date(), source];

        connection.query(insertTable, values, (err, result) => {
            if (err) {
                console.error("File Insert Error : ", err);
                return;
            } else {
                console.log(
                    `File "${file_name.substring(9)}" has been uploaded successfully.`
                );
            }
        });
        return 1
    } catch (error) {
        console.log("MySQL error : ",error)
    }
}

module.exports = uploadToDb