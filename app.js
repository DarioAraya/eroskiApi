const express = require("express");
const app = express();
const path = require("path");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));

const whiteList = ["https://localhost:4000"];

app.use(cors({ origin: whiteList }));

//Mostrar todos los productos de la categoria inicial
app.get(
  "/",
  catchAsync(async (req, res, next) => {
    res.sendFile(path.join(__dirname, "/views/eroski/index.html"));
  })
);

//filtrar por nombre
app.get(
  "/search",
  catchAsync(async (req, res, next) => {
    res.sendFile(path.join(__dirname, "/views/eroski/search.html"));
  })
);

//filtrar por categoria
app.get(
  "/filter",
  catchAsync(async (req, res, next) => {
    res.sendFile(path.join(__dirname, "/views/eroski/filter.html"));
  })
);

//ordenar por
app.get(
  "/sort",
  catchAsync(async (req, res, next) => {
    res.sendFile(path.join(__dirname, "/views/eroski/sort.html"));
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).sendFile(path.join(__dirname, "/views/error.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
