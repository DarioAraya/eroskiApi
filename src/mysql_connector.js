const mysql = require('mysql');

const connection= mysql.createConnection({
 host:'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
 database:'bsale_test',
 user:'bsale_test',
 password:'bsale_test'
})


module.exports=connection;