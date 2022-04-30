//importando express
const express = require("express");
const app = express();
//importando metodo path para tener acceso a carpetas en el proyecto
const path = require("path");
//importando funcion catchAsync para poder atrapar errores en las llamadas a la api
const catchAsync = require("./utils/catchAsync");
//importando express error para poder rescatar datos de los errores.
const ExpressError = require("./utils/ExpressError");
//dando acceso a la carpeta views
app.set("views", path.join(__dirname, "views"));
//dando acceso a la carpeta public
app.use(express.static(__dirname + "/public"));

//VISTAS
//Mostrar todos los productos de la categoria inicial
app.get(
  "/",
  catchAsync(async (req, res, next) => {
    res.sendFile(path.join(__dirname, "/views/eroski/index.html"));
  })
);

//Mostrar todos los productos de una categoria filtrados por nombre
app.get(
  "/search",
  catchAsync(async (req, res, next) => {
    res.sendFile(path.join(__dirname, "/views/eroski/search.html"));
  })
);

//Mostrar todos los productos filtrados por categoria
app.get(
  "/filter",
  catchAsync(async (req, res, next) => {
    res.sendFile(path.join(__dirname, "/views/eroski/filter.html"));
  })
);

//Mostrar todos los productos ordenados por NombreA,NombreD,PrecioA,PrecioD
app.get(
  "/sort",
  catchAsync(async (req, res, next) => {
    res.sendFile(path.join(__dirname, "/views/eroski/sort.html"));
  })
);
//Para atrapar cualquier ruta fuera de las anteriores y devolver un 404 not found
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});
//Para enviar la plantilla de error
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).sendFile(path.join(__dirname, "/views/error.html"));
});
//Iniciando servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
