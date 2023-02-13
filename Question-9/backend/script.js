const { urlencoded, json,static } = require('express');
const express = require('express');
const {join} = require('path');
const { v4 } = require('uuid');
const upload = require('./middleware/uploads');
const connection = require('./sql/connection/conn');
const { insertionQuery, getFilesQuery } = require('./sql/query/constants');
const app = express();

app.use(urlencoded({extended:true}))
app.use(json())
app.use("/static/file",static(join(process.cwd() + "/uploads")))

app.post("/upload",upload,async(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5173")
    const allFiles = req.files;
    //! Uncomment it while creation  of table after that comment it out
    // connection.query(tableCreationQuery, (err, result) => {
    //     if (err) {
    //         console.error("Table Creation Error : ", err);
    //     } else {
    //         console.log(`Table Created Successfully !!!`);
    //     }
    // });
    for (let i = 0; i < allFiles.length; i++) {
        const file_id = v4();
        const file = allFiles[i];
        const file_name = file.originalname;
        const file_url = "http://localhost:2000/static/file/" + file.filename
        const upload_date_time = new Date()
        const values = [file_id,file_name,file_url,upload_date_time]
        connection.query(insertionQuery,values, (err, result) => {
            if (err) {
                console.error("Table Insertion Error : ", err);
            } else {
                console.log(`File Inserted  Successfully !!!`);
            }
        });
    }
    return res.status(200).send({message:"Files Uploaded Successfully !!!"})
})

app.get("/getFiles",async(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5173")
    connection.query(getFilesQuery,(err,result,field)=>{
        if(err) console.log("Error In Fetching :" ,err)
        return res.status(200).send(result)
    })
})

app.listen(2000)
