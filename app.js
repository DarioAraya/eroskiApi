const express = require('express');
const app = express();
const path = require('path');
const conectando = require('./src/mysql_connector.js');
const ejsMate = require("ejs-mate");
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');

app.engine('ejs',ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

conectando.connect((err)=>{
    if(err) throw err;
    console.log("Conectado a la base");
});


app.get('/', catchAsync(async(req,res,next)=>{
   
        let sql =  'SELECT * FROM product';
       await conectando.query(sql,  (err, results) => {
           if(err) throw err;   
            sql =  'SELECT * FROM category';
            conectando.query(sql,(error,results2)=>{
                if(error) throw error; 
                res.render('eroski/index',{data: results, data2: results2})  
          
            })
              
          })
  
}));


app.get('/search', catchAsync(async(req,res,next)=>{
    let name = req.query.name;
        var sql = `SELECT * from product where name LIKE '%${name}%'`;
       await conectando.query(sql,(err,results)=>{
            if(err)throw err;
            sql =  'SELECT * FROM category';
            conectando.query(sql,(error,results2)=>{
                if(error) throw error; 
                res.render('eroski/index',{data: results, data2: results2})  
                
            })
        });
}));

app.get('/filter', catchAsync(async(req,res,next)=>{
    let id = req.query.id;
        var sql = `SELECT * from product where category LIKE '%${id}%'`;
       await conectando.query(sql,(err,results)=>{
            if(err)throw err;
            sql =  'SELECT * FROM category';
            conectando.query(sql,(error,results2)=>{
                if(error) throw error; 
                res.render('eroski/index',{data: results, data2: results2})  
                
            })
        });
}));



app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    return res.status(statusCode).render('error', { err })
})

app.listen(3000, ()=>{
    console.log('Serving on port 3000')
})


//keep alive
setInterval(function () {
    conectando.query('SELECT 1');
}, 4000);
