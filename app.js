const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require("ejs-mate");
const catchAsync = require('./utils/catchAsync');
const axios = require('axios').default;
const ExpressError = require('./utils/ExpressError');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine('ejs',ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

//Mostrar todos los productos de la categoria inicial
app.get('/',catchAsync(async(req,res,next)=>{
    const response = await axios.get('https://eroski-api-backend.herokuapp.com/all-products');
    res.render('eroski/index',{...response.data})    
}));

//filtrar por nombre
app.get('/search', catchAsync(async(req,res,next)=>{
    let nameQuery = req.query.name;
    const response = await axios.post('https://eroski-api-backend.herokuapp.com/find-for-name',{
        name: nameQuery
      })
    res.render('eroski/index',{...response.data})  
}));

//filtrar por categoria
app.get('/filter', catchAsync(async(req,res,next)=>{
    let idQuery = req.query.id;
    const response = await axios.post('https://eroski-api-backend.herokuapp.com/filter-by-cat',{
        id: idQuery
      })
    res.render('eroski/index',{...response.data})  
}));

//ordenar por
app.get('/sort', catchAsync(async(req,res,next)=>{
    let sortByQuery = req.query.sortBy;
    let idQuery = req.query.id;

    const response = await axios.post('https://eroski-api-backend.herokuapp.com/sort-by',{
        id: idQuery,
        sortBy: sortByQuery
      })
    res.render('eroski/index',{...response.data})  
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

