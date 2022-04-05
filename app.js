const express = require('express');
const app = express();
const path = require('path');
const conectando = require('./src/mysql_connector.js');

const {insert,read}=require('./operations');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

conectando.connect((err)=>{
    if(err) throw err;
    console.log("Conectado a la base");
});

app.get('/', (req,res)=>{
    res.render('home')
})

app.get('/insert', (req,res)=>{
    insert(conectando,(result)=>{
    res.json(result);
    })
})

app.get('/read', (req,res)=>{
    read(conectando,(result)=>{
    res.json(result);
    });
});


app.listen(3000, ()=>{
    console.log('Serving on port 3000')
})


//keep alive
setInterval(function () {
    conectando.query('SELECT 1');
}, 4000);
