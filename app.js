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
const prueba =['nombreA','nombreD','precioA','precioD'];

app.get('/', catchAsync(async(req,res,next)=>{
   
        let sql =  "SELECT * FROM product where category LIKE 1";
       await conectando.query(sql,catchAsync(async(err, results) => {
           if(err) throw err;   
            sql =  "SELECT * FROM category";
           await conectando.query(sql,(error,results2)=>{
                if(error) throw error; 
                res.render('eroski/index',{data: results, data2: results2, data3: prueba})  
          
            });
              
          }));
  
}));


app.get('/search', catchAsync(async(req,res,next)=>{
    let name = req.query.name;
 
        var sql = `SELECT * from product where name LIKE "%${name}%"`;
    
        
        conectando.query(await sql,catchAsync(async(err,results)=>{
            if(err)throw err;
            sql =  "SELECT * FROM category";
            await conectando.query(sql,(error,results2)=>{
                if(error) throw error; 
                res.render('eroski/index',{data: results, data2: results2, data3: prueba})  
                
            })
        }));
}));

app.get('/filter', catchAsync(async(req,res,next)=>{
    let id = req.query.id;
        var sql = `SELECT * from product where category LIKE "%${id}%"`;
       await conectando.query(sql,catchAsync(async(err,results)=>{
            if(err)throw err;
            sql =  "SELECT * FROM category";
            await conectando.query(sql,(error,results2)=>{
                if(error) throw error; 
                res.render('eroski/index',{data: results, data2: results2, data3: prueba})  
             
            })
        }));
}));



app.get('/sort', catchAsync(async(req,res,next)=>{
    let id = req.query.id;
    if(id==='nombreA'){
        var sql = `SELECT * from product ORDER BY name`;
    }else if(id==='nombreD'){
        var sql = `SELECT * from product ORDER BY name DESC`;
    }else if(id==='precioA'){
        var sql = `SELECT * from product ORDER BY price DESC`;
    }else if(id==='precioD'){
        var sql = `SELECT * from product ORDER BY price`;
    }else{
        var sql = `SELECT * from product`;
    }
       await conectando.query(sql,catchAsync(async(err,results)=>{
            if(err)throw err;
            sql =  'SELECT * FROM category';
           await conectando.query(sql,(error,results2)=>{
                if(error) throw error; 
                res.render('eroski/index',{data: results, data2: results2, data3: prueba})  
                
            })
        }));
}));






app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
 res.status(statusCode).render('error', { err })
})


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Serving on port ${port}`)
})


//keep alive
setInterval(function () {
    conectando.query('SELECT 1');
}, 4000);
