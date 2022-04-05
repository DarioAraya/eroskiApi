const mysql = require('mysql');


function insert(connection, callback){
    let insertQuery = "INSERT INTO product(id,name,url_image,price,discount,category) VALUES ('192','prueba','https://www.redeszone.net/app/uploads-redeszone.net/2017/02/mysql.png','2000','0','1')";
    connection.query(insertQuery,function(err,result){
        if(err) throw err;
        callback(result);
    });
}

function read(connection,callback){
    connection.query('SELECT * FROM product',function(err,result){
        if(err) throw err;
        callback(result);
    });

}

module.exports={insert,read}
