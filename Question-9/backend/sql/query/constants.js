  //! Uncomment it while creation  of table after that comment it out

// const tableCreationQuery = `CREATE TABLE file_store(file_id varchar(255),file_name varchar(255),file_url varchar(2000),upload_date_time datetime)`

const insertionQuery = `INSERT INTO file_store(file_id,file_name,file_url, upload_date_time) 
VALUES (?, ?, ?, ?)`

const getFilesQuery = `SELECT * FROM file_store`


module.exports = {insertionQuery,getFilesQuery};
