const express = require('express');
const app = express();
const path = require('path');
const conectando = require('./src/mysql_connector.js');



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

conectando.connect((err)=>{
    if(err) throw err;
    console.log("Conectado a la base");
});

app.get('/', (req,res)=>{
    res.render('home')
})

app.get('/eroski', async (req,res)=>{
    const sql = await 'SELECT * FROM product';
    conectando.query(sql, (error, results)=>{
        if(error) throw error;
        if(results.length>0){
            res.render('eroski/index',{results})
        }else{
            res.send('Not results')
        }
    })
});


app.listen(3000, ()=>{
    console.log('Serving on port 3000')
})


//keep alive
setInterval(function () {
    conectando.query('SELECT 1');
}, 4000);
