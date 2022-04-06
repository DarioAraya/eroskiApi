const express = require('express');
const app = express();
const path = require('path');
const conectando = require('./src/mysql_connector.js');
const ejsMate = require("ejs-mate");

app.engine('ejs',ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

conectando.connect((err)=>{
    if(err) throw err;
    console.log("Conectado a la base");
});


app.get('/',(req,res)=>{
    let sql =  'SELECT * FROM product';
    conectando.query(sql,  (err, results) => {
       if(err) throw err;     
           res.render('eroski/index',{data: results} );    
      })   
});


app.get('/search', (req,res)=>{
    let name = req.query.name;
        var sql = `SELECT * from product where name LIKE '%${name}%'`;
        conectando.query(sql,(err,results)=>{
            if(err)throw err;
            res.render('eroski/index',{data:results});
        });
})



app.listen(3000, ()=>{
    console.log('Serving on port 3000')
})


//keep alive
setInterval(function () {
    conectando.query('SELECT 1');
}, 4000);
